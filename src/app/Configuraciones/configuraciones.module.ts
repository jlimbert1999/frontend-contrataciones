import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DependenciasComponent } from './dependencias/dependencias.component';
import { InstitucionesComponent } from './instituciones/instituciones.component';
import { InstitucionDialogComponent } from './instituciones/institucion-dialog/institucion-dialog.component';
import { MaterialModule } from '../angular-material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DependenciasComponent,
    InstitucionesComponent,
    InstitucionDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ConfiguracionesModule { }
