import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InstitucionModel } from '../models/institucion.model';
import { InstitucionesService } from '../services/instituciones.service';
import { InstitucionDialogComponent } from './institucion-dialog/institucion-dialog.component';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {
  Instituciones: InstitucionModel[] = []
  Total: number = 0
  dataSource = new MatTableDataSource()
  displayedColumns = [
    { key: 'sigla', titulo: 'Sigla' },
    { key: 'nombre', titulo: 'Nombre' },
    { key: 'activo', titulo: 'Situacion' }
  ]
  @ViewChild("txtSearch") private searchInput: ElementRef;

  constructor(
    public dialog: MatDialog,
    public institucionesService: InstitucionesService
  ) { }

  ngOnInit(): void {
    this.obtener_instituciones()

  }

  agregar_instituciones() {
    const dialogRef = this.dialog.open(InstitucionDialogComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((result: InstitucionModel) => {
      if (result) {
        if (this.Instituciones.length > 10) {
          this.Instituciones.pop()
        }
        this.Instituciones.unshift(result)
        this.dataSource.data = this.Instituciones
      }
    });
  }
  editar_institucion(data: any) {
    const dialogRef = this.dialog.open(InstitucionDialogComponent, {
      width: '700px',
      data
    });
    dialogRef.afterClosed().subscribe((result: InstitucionModel) => {
      if (result) {
        const foundIndex = this.Instituciones.findIndex(int => int.id_institucion == data.id_institucion);
        this.Instituciones[foundIndex] = result;
        this.dataSource.data = this.Instituciones

      }
    });
  }
  habilitar_institucion(data: any) {
    this.institucionesService.habilitar(data.id_institucion!).subscribe(inst => {
      const indexFound = this.Instituciones.findIndex(inst => inst.id_institucion == data.id_institucion)
      this.Instituciones[indexFound].activo = true
    })
  }

  eliminar_institucion(data: any) {
    this.institucionesService.eliminar(data.id_institucion!).subscribe(inst => {
      const indexFound = this.Instituciones.findIndex(inst => inst.id_institucion == data.id_institucion)
      this.Instituciones[indexFound].activo = false
    })
  }
  obtener_instituciones() {
    this.institucionesService.obtener_instituciones().subscribe(inst => {
      this.Instituciones = inst
      this.dataSource.data = this.Instituciones
    })
  }
  buscar_institucion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === '') {
      return
    }
    this.institucionesService.buscar_instituciones(filterValue.trim().toLowerCase()).subscribe(data => {
      this.Instituciones = data
      this.dataSource.data = this.Instituciones
    })
  }
  cambiar_paginacion(evento: PageEvent) {
    this.obtener_instituciones()
  }

  activar_busqueda() {
    this.institucionesService.modo_busqueda = true
    setTimeout(() => {
      this.searchInput.nativeElement.focus()
    })
  }
  desactivar_busqueda() {
    this.institucionesService.termino_busqueda = ""
    this.institucionesService.modo_busqueda = false
    this.obtener_instituciones()
  }

}
