import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogRemisionComponent } from '../dialog-remision/dialog-remision.component';
import { BandejaService } from '../services/bandeja.service';

@Component({
  selector: 'app-bandeja-salida',
  templateUrl: './bandeja-salida.component.html',
  styleUrls: ['./bandeja-salida.component.css']
})
export class BandejaSalidaComponent implements OnInit {
  dataSource = new MatTableDataSource();
  // displayedColumns = ['situacion', 'alterno', 'ubicacion', 'objeto', 'presupuesto', 'origen', 'plazo', 'nro_apertura', 'modalidad', 'cuce', 'precio_adjudicado']
  displayedColumns = ['situacion', 'fecha_envio', 'fecha_recibido', 'origen', 'fecha_creacion', 'alterno', 'ubicacion', 'objeto', 'tipo_contratacion', 'precio', 'empresa_adjudicada', 'representante_legal', 'precio_adjudicado', 'estado', 'observaciones', 'plazo', 'nro_apertura', 'modalidad', 'cuce', 'opciones']

  constructor(
    private bandejaService: BandejaService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.bandejaService.obtener_bandejaSalida().subscribe(tramites => {
      this.dataSource = new MatTableDataSource(tramites)
    })
  }

  reenviar_tramite(tramite: any) {
    const dialogRef = this.dialog.open(DialogRemisionComponent, {
      width: '700px',
      data: { detalles_tramite: tramite, detalles_reenvio: { cuenta_receptor: tramite.cuenta_receptor } }

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bandejaService.obtener_bandejaEntrada().subscribe()
      }
    });
  }

}
