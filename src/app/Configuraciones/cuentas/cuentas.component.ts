import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, ReplaySubject, startWith, Subject, takeUntil } from 'rxjs';
import { CuentaModel, CuentaModel_view } from '../models/cuenta.mode';
import { UsuarioModel } from '../models/usuario.model';
import { CuentaService } from '../services/cuenta.service';
import { AsignacionDialogComponent } from './asignacion-dialog/asignacion-dialog.component';
import { CuentaDialogComponent } from './cuenta-dialog/cuenta-dialog.component';
import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog.component';




@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  Cuentas: CuentaModel_view[] = []
  Total: number = 0
  dataSource = new MatTableDataSource<CuentaModel_view>()
  displayedColumns = ['nro', 'login', 'nombre', 'dni', 'cargo', 'dependencia', 'rol', 'opciones']
  isLoadingResults = true;

  //opciones para filtrar
  Dependencias: any[]
  Instituciones: any[]
  parametros_filtro = {
    id_institucion: "",
    id_dependencia: ""
  }
  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();
  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  modo_filtro: boolean = false
  @ViewChild("txtSearch") private searchInput: ElementRef;
  constructor(public dialog: MatDialog, public cuentaService: CuentaService) { }

  ngOnInit(): void {
    this.obtener_cuentas()
  }
  agregar_cuenta() {
    const dialogRef = this.dialog.open(CuentaDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Cuentas.unshift(result)
        if (this.Cuentas.length > this.cuentaService.rows) {
          this.Cuentas.pop()
        }
        this.dataSource.data = this.Cuentas
      }
    });
  }
  editar_cuenta(data: CuentaModel_view) {
    const dialogRef = this.dialog.open(CuentaDialogComponent, {
      width: '800px',
      data: data
    });
    dialogRef.afterClosed().subscribe((result: CuentaModel) => {
      if (result) {
        this.Cuentas.map(element => {
          if (element.cuenta?._id === result._id) {
            element.cuenta!.login = result.login
            element.cuenta!.rol = result.rol
          }
          return element
        })
        this.dataSource.data = this.Cuentas
      }
    });
  }

  agregar_funcionario() {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Cuentas.unshift(result)
        if (this.Cuentas.length > this.cuentaService.rows) {
          this.Cuentas.pop()
        }
        this.dataSource.data = this.Cuentas
      }
    });
  }
  editar_funcionario(user: CuentaModel_view) {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe((result: CuentaModel_view) => {
      if (result) {
        const indexFound = this.Cuentas.findIndex(element => element.id_funcionario === result.id_funcionario)
        this.Cuentas[indexFound] = result
        this.dataSource.data = this.Cuentas
      }
    });
  }
  asignar_cuenta(cuenta: CuentaModel_view) {
    const dialogRef = this.dialog.open(AsignacionDialogComponent, {
      width: '800px',
      data: cuenta
    });
    dialogRef.afterClosed().subscribe((result: CuentaModel_view) => {
      if (result) {
        const indexFound = this.Cuentas.findIndex(element => element.id_funcionario === cuenta.id_funcionario)
        this.Cuentas[indexFound] = result
        this.dataSource.data = this.Cuentas
      }
    });
  }
  buscar() {
    if (this.cuentaService.termino_busqueda !== '') {
      this.cuentaService.buscar_cuenta().subscribe(cuentas => {

        this.Cuentas = cuentas
        this.dataSource.data = this.Cuentas
      })
    }

  }


  obtener_cuentas() {
    this.cuentaService.obtener_cuentas().subscribe(cuentas => {
      this.Cuentas = cuentas
      this.dataSource.data = this.Cuentas
      this.isLoadingResults = false
    })
  }


  cambiar_paginacion(event: PageEvent) {
    this.cuentaService.page = event.pageIndex
    this.cuentaService.rows = event.pageSize
    this.obtener_cuentas()
  }

  activar_busqueda() {
    this.cuentaService.modo_busqueda(true)
    setTimeout(() => {
      this.searchInput.nativeElement.focus()
    })
  }
  desactivar_busqueda() {
    this.cuentaService.modo_busqueda(false)
    this.obtener_cuentas()
  }

  modo_filtrado(activo: boolean) {
    this.modo_filtro = activo
    if (activo) {
      this.cuentaService.obtener_instituciones_hablitadas().subscribe(inst => this.Instituciones = inst)
    }
    else {
      this.obtener_cuentas()
    }
  }

  seleccionar_dependencia(id_institucion: string) {
    this.cuentaService.obtener_dependencias_hablitadas(id_institucion).subscribe(deps => {
      this.Dependencias = deps
      this.bankCtrl.setValue(this.Dependencias);

      // load the initial bank list
      this.filteredBanks.next(this.Dependencias.slice());

      // listen for search field value changes
      this.bankFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanks();
        });

    })

  }
  protected filterBanks() {
    if (!this.Dependencias) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.Dependencias.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.Dependencias.filter(dep => dep.nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  filtrar() {

    console.log(this.parametros_filtro);
  }









}
