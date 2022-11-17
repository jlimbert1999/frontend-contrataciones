import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion/administracion.component';
import { MaterialModule } from '../angular-material/material.module';
import { TramiteDialogComponent } from './administracion/tramite-dialog/tramite-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';
import { BandejaSalidaComponent } from './bandeja-salida/bandeja-salida.component';
import { DialogRemisionComponent } from './dialog-remision/dialog-remision.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ControlComponent } from './control/control.component';
import { FichaComponent } from './ficha/ficha.component';
import { RouterModule } from '@angular/router';
import { NgxGraphModule } from '@swimlane/ngx-graph';


@NgModule({
  declarations: [
    AdministracionComponent,
    TramiteDialogComponent,
    BandejaEntradaComponent,
    BandejaSalidaComponent,
    DialogRemisionComponent,
    ControlComponent,
    FichaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    RouterModule,
    NgxGraphModule
  ]

})
export class TramitesModule { }
