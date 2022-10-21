import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion/administracion.component';
import { MaterialModule } from '../angular-material/material.module';
import { TramiteDialogComponent } from './administracion/tramite-dialog/tramite-dialog.component';



@NgModule({
  declarations: [
    AdministracionComponent,
    TramiteDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class TramitesModule { }
