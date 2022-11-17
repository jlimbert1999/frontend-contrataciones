import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { TramiteDialogComponent } from '../administracion/tramite-dialog/tramite-dialog.component';
import { DialogRemisionComponent } from '../dialog-remision/dialog-remision.component';
import { BandejaService } from '../services/bandeja.service';

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {
  dataSource = new MatTableDataSource();
  // displayedColumns = ['recibido', 'alterno', 'ubicacion', 'objeto', 'presupuesto', 'origen', 'plazo', 'nro_apertura', 'modalidad', 'cuce', 'precio_adjudicado', 'opciones']

  displayedColumns = ['recibido', 'fecha_envio', 'origen', 'fecha_creacion', 'alterno', 'ubicacion', 'objeto', 'tipo_contratacion', 'precio', 'empresa_adjudicada', 'representante_legal', 'precio_adjudicado', 'estado', 'observaciones', 'plazo', 'nro_apertura', 'modalidad', 'cuce', 'opciones']
  expandedElement: any | null;

  constructor(
    public bandejaService: BandejaService,
    public dialog: MatDialog,
    public authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.bandejaService.obtener_bandejaEntrada().subscribe()
  }
  editar_tramite(tramite: any) {
    const dialogRef = this.dialog.open(TramiteDialogComponent, {
      width: '700px',
      data: tramite
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bandejaService.obtener_bandejaEntrada().subscribe()
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
        this.bandejaService.obtener_bandejaEntrada().subscribe()
      }
    });
  }
  aceptar_tramite(tramite: any) {
    Swal.fire({
      title: `Aceptar tramite?`,
      text: `El tramite ${tramite.alterno} sera marcado como aceptado`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bandejaService.aceptar_tramite(tramite.id_tramite, tramite.cuenta_emisor, this.authService.Detalles_Cuenta.dependencia).subscribe(message => {
          this.bandejaService.obtener_bandejaEntrada().subscribe()
          this.toastr.info(undefined, message, {
            positionClass: 'toast-bottom-right',
            timeOut: 3000,
          })
        })

      }
    })


  }
  rechazar_tramite(tramite: any) {
    Swal.fire({
      title: `Rechazar tramite?`,
      text: `El tramite ${tramite.alterno} sera marcado como rechazado`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bandejaService.rechazar_tramite(tramite.id_tramite, tramite.cuenta_emisor).subscribe(message => {
          this.toastr.info(undefined, message, {
            positionClass: 'toast-bottom-right',
            timeOut: 3000,
          })
        })
        this.bandejaService.obtener_bandejaEntrada().subscribe()
      }
    })


  }

}
