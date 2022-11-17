import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RequerimientoModel } from 'src/app/Configuraciones/models/requerimientos';
import { TiposTramitesModel } from 'src/app/Configuraciones/models/tiposTramites.model';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-tramite-dialog',
  templateUrl: './tramite-dialog.component.html',
  styleUrls: ['./tramite-dialog.component.css']
})
export class TramiteDialogComponent implements OnInit {
  tipos_tramites: TiposTramitesModel[] = []
  requerimientos: RequerimientoModel[] = []
  alterno: string
  Form_Tramite: FormGroup = this.fb.group({
    tipoTramite: ['', Validators.required],
    objeto: ['', Validators.required],
    apertura: ['', Validators.required],
    origen: ['', Validators.required],
    precio: ['', Validators.required],
    codigo_proyecto: ['', Validators.required],
    plazo_ejecucion: ['', Validators.required]
  });
  Form_Tramite_sicoes: FormGroup = this.fb.group({
    modalidad: ['', Validators.required],
    cuce: ['', Validators.required],
    precio_adjudicado: ['', Validators.required],
    tipo_contratacion: ['', Validators.required],
    fecha_apertura_sobre: ['', Validators.required],
    tipo_resolucion: ['', Validators.required],
    empresa_adjudicada: ['', Validators.required],
    representante_legal: ['', Validators.required],
    observaciones: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder, private tramiteService: TramiteService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TramiteDialogComponent>,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data) {
      this.Form_Tramite = this.fb.group({
        objeto: ['', Validators.required],
        apertura: ['', Validators.required],
        origen: ['', Validators.required],
        precio: ['', Validators.required],
        codigo_proyecto: ['', Validators.required],
        plazo_ejecucion: ['', Validators.required]
      });
      this.Form_Tramite.patchValue(this.data)
      this.Form_Tramite_sicoes.patchValue(this.data)
    } else {
      this.tramiteService.obtener_tipos_tramites().subscribe(tipos => {
        this.tipos_tramites = tipos
      })
    }

  }

  guardar() {
    if (this.Form_Tramite.valid) {
      if (this.data) {
        if (this.authService.Detalles_Cuenta.rol === 'planificacion') {
          this.tramiteService.editar_tramites(this.data.id_tramite, this.Form_Tramite.value).subscribe(tramite => {
            this.dialogRef.close(tramite)
          })
        }
        else if (this.authService.Detalles_Cuenta.rol === 'sicoes') {
          this.tramiteService.editar_tramites(this.data.id_tramite, this.Form_Tramite_sicoes.value).subscribe(tramite => {
            this.dialogRef.close(tramite)
          })
        }

      }
      else {

        let tramite = { ...this.Form_Tramite.value, alterno: this.alterno }
        this.tramiteService.agregar_tramite(tramite).subscribe(tramite => {
          this.dialogRef.close(tramite)
        })
      }

    }




  }
  cargar_requerimientos(requerimientos: RequerimientoModel[], alterno: string) {
    this.requerimientos = []
    console.log(requerimientos);
    this.alterno = alterno
    requerimientos.forEach(element => {
      if (element.activo) {
        this.requerimientos.push(element)
      }
    });

  }

}
