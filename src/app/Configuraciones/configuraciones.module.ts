import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DependenciasComponent } from './dependencias/dependencias.component';
import { InstitucionesComponent } from './instituciones/instituciones.component';
import { InstitucionDialogComponent } from './instituciones/institucion-dialog/institucion-dialog.component';
import { MaterialModule } from '../angular-material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { DependenciaDialogComponent } from './dependencias/dependencia-dialog/dependencia-dialog.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDialogComponent } from './usuarios/usuario-dialog/usuario-dialog.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { CuentaDialogComponent } from './cuentas/cuenta-dialog/cuenta-dialog.component';
import { TiposTramitesComponent } from './tipos-tramites/tipos-tramites.component'; 
import { DialogTiposComponent } from './tipos-tramites/dialog-tipos/dialog-tipos.component';



@NgModule({
  declarations: [
    DependenciasComponent,
    InstitucionesComponent,
    InstitucionDialogComponent,
    DependenciaDialogComponent,
    UsuariosComponent,
    UsuarioDialogComponent,
    CuentasComponent,
    CuentaDialogComponent,
    TiposTramitesComponent,
    DialogTiposComponent
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
