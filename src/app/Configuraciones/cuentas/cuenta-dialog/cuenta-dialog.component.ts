import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CuentaModel } from '../../models/cuenta.mode';
import { CuentaService } from '../../services/cuenta.service';

@Component({
  selector: 'app-cuenta-dialog',
  templateUrl: './cuenta-dialog.component.html',
  styleUrls: ['./cuenta-dialog.component.css']
})
export class CuentaDialogComponent implements OnInit {
  titulo:string=''
  dependencias:{id_dependencia:string, nombre:string}[]
  Form_Funcionario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    dni: ['', Validators.required],
    telefono: ['',  [Validators.required, Validators.maxLength(8)]],
    cargo: ['', Validators.required],
    direccion: ['', Validators.required]
  });

  Form_Cuenta: FormGroup = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    rol: ['', Validators.required],
    dependencia: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CuentaModel,
    public dialogRef: MatDialogRef<CuentaDialogComponent>,
    private cuentasService: CuentaService
    ) { }

  ngOnInit(): void {
    if (this.data) {
      this.titulo = 'Edicion';
     
    } else {
      this.titulo = 'Registro';
      this.cuentasService.obtener_dependencias_hablitadas().subscribe(dep=>this.dependencias=dep)
    }
  }
  guardar() {
    if (this.Form_Funcionario.valid && this.Form_Cuenta.valid) {
      if (this.data) {
        // this.institucionesService.actualizar_institucion(this.data.id_institucion!, this.Form_Institucion.value).subscribe(inst => {
        //   this.dialogRef.close(inst)
        // })
      }
      else {
        this.cuentasService.agregar_cuenta(this.Form_Cuenta.value, this.Form_Funcionario.value).subscribe(cuenta => {
          this.dialogRef.close(cuenta)
        })
      }

    }



  }


}
