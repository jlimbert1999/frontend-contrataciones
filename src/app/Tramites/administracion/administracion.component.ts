import { Component, OnInit } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogRemisionComponent } from '../dialog-remision/dialog-remision.component';
import { TramiteService } from '../services/tramite.service';
import { TramiteDialogComponent } from './tramite-dialog/tramite-dialog.component';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['origen', 'fecha_creacion', 'alterno', 'ubicacion', 'objeto', 'tipo_contratacion', 'precio', 'empresa_adjudicada', 'representante_legal', 'precio_adjudicado', 'estado', 'observaciones', 'plazo', 'nro_apertura', 'modalidad', 'cuce', 'opciones']
  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }
  constructor(public dialog: MatDialog, private tramiteService: TramiteService) { }

  ngOnInit(): void {
    this.obtener_tramites()
  }

  agregar_tramite() {
    const dialogRef = this.dialog.open(TramiteDialogComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtener_tramites()
      }
    });
  }
  editar_tramite(tramite: any) {
    const dialogRef = this.dialog.open(TramiteDialogComponent, {
      width: '700px',
      data: tramite
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtener_tramites()
      }
    });
  }
  remitir_tramite(tramite: any) {
    const dialogRef = this.dialog.open(DialogRemisionComponent, {
      width: '700px',
      data: { detalles_tramite: tramite, detalles_reenvio: null }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtener_tramites()
      }
    });
  }
  obtener_tramites() {
    this.tramiteService.obtener_tramites().subscribe(tramites => {
      this.dataSource = new MatTableDataSource(tramites)
    })
  }



}
