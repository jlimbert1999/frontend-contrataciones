import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TiposTramitesModel } from '../../models/tiposTramites.model';
import { TiposTramitesService } from '../../services/tipos-tramites.service';
import Swal from 'sweetalert2';
import { RequerimientoModel } from '../../models/requerimientos';
@Component({
  selector: 'app-dialog-tipos',
  templateUrl: './dialog-tipos.component.html',
  styleUrls: ['./dialog-tipos.component.css'],
})
export class DialogTiposComponent implements OnInit {
  titulo: string;
  Form_TipoTramite: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
  });
  Requerimientos: RequerimientoModel[] = [];

  displayedColumns = ['nombre', 'opciones'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TiposTramitesModel,
    public dialogRef: MatDialogRef<DialogTiposComponent>,
    private tiposTramitesService: TiposTramitesService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.titulo = 'Edicion';
      this.Form_TipoTramite.patchValue(this.data);
    } else {
      this.titulo = 'Registro';
    }
  }
  guardar() {
    if (this.Form_TipoTramite.valid) {
      if (this.data) {
        // this.usuariosService.editar_funcionario(this.data.id_funcionario!,this.Form_Funcionario.value).subscribe(inst => {
        //   this.dialogRef.close(inst)
        // })
      } else {
        this.tiposTramitesService
          .agregar_tipoTramite(this.Form_TipoTramite.value)
          .subscribe((tipo) => {
            this.dialogRef.close(tipo);
          });
      }
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  agregar_requerimiento() {
    Swal.fire({
      title: 'Ingrese el nombre del funcionario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          const requisito = {
            nombre: result.value,
            activo: true,
          };

          this.dataSource.data.push(requisito);
        }
      }
    });
    // if (this.titulo == "Registro") {
    //   this.Requerimientos.push(requerimiento)
    //   this.dataSource.data = this.Requerimientos
    // }
    // else if (this.titulo == "Edicion") {
    //   requerimiento.id_TipoTramite = this.data.tipo_tramite.id_TipoTramite
    //   this.tiposTramitesService.addRequerimiento(requerimiento).subscribe((resp: any) => {
    //     if (resp.ok) {
    //       requerimiento.id_requerimiento = resp.id_requerimiento
    //       this.Requerimientos.push(requerimiento)
    //       this.alternar_vista_requerimientos(this.isChecked)
    //     }
    //   })
    // }
  }
}
