import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CuentaModel_view } from '../../models/cuenta.mode';
import { CuentaService } from '../../services/cuenta.service';
import Swal from 'sweetalert2';
import { crear_hoja_usuarios } from 'src/app/generacion_pdfs/usuario';

@Component({
  selector: 'app-asignacion-dialog',
  templateUrl: './asignacion-dialog.component.html',
  styleUrls: ['./asignacion-dialog.component.css']
})
export class AsignacionDialogComponent implements OnInit {
  displayedColumns = ['nombre', 'cargo', 'dni', 'opciones'];
  dataSource: MatTableDataSource<any>;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CuentaModel_view,
    public dialogRef: MatDialogRef<AsignacionDialogComponent>,
    private cuentasService: CuentaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cuentasService.obtener_funcionarios_asignacion().subscribe(users => {
      this.dataSource = new MatTableDataSource(users)
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  asignar_cuenta(funcionario: { _id: string, nombre: string, cargo: string, dni: string }) {
    Swal.fire({
      title: `Asignar la cuenta a un nuevo funcionario?`,
      text: `${funcionario.nombre} (${funcionario.cargo}) obtendra la cuenta`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Asignar'
    }).then((result) => {

      if (result.isConfirmed) {
        let newLogin: string[] = funcionario.nombre.split(' ')
        let newAccount = {
          login: `${newLogin[0]}${newLogin[1][0]}`,
          password: funcionario.dni
        }
        this.cuentasService
          .asignar_cuenta(this.data.id_cuenta, this.data.funcionario._id!, funcionario._id, newAccount)
          .subscribe(cuenta => {
            this.dialogRef.close(cuenta)
            crear_hoja_usuarios(cuenta.funcionario.nombre, cuenta.funcionario.cargo, cuenta.dependencia.nombre, cuenta.funcionario.dni, cuenta.dependencia.institucion.sigla, newAccount.login, newAccount.password)
          });
      }
    })
  }

}
