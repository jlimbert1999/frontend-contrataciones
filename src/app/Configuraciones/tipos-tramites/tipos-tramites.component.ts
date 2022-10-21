import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TiposTramitesModel } from '../models/tiposTramites.model';
import { TiposTramitesService } from '../services/tipos-tramites.service';
import { DialogTiposComponent } from './dialog-tipos/dialog-tipos.component';

@Component({
  selector: 'app-tipos-tramites',
  templateUrl: './tipos-tramites.component.html',
  styleUrls: ['./tipos-tramites.component.css'],
})
export class TiposTramitesComponent implements OnInit {
  Total: number = 0;
  dataSource = new MatTableDataSource()
  displayedColumns = [
    { key: 'nombre', titulo: 'Nombre' },
    { key: 'activo', titulo: 'Situacion' },
  ];
  constructor(
    public dialog: MatDialog,
    private tiposTramitesService: TiposTramitesService
  ) {}
  

  ngOnInit(): void {
    this.obtener_tiposTramites()
  }

  agregar_tipoTramite() {
    const dialogRef = this.dialog.open(DialogTiposComponent, {
      width: '1000px',
    });
  }
  editar_tipoTramite(data: any) {
    const dialogRef = this.dialog.open(DialogTiposComponent, {
      width:'1000px',
      data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
       this.obtener_tiposTramites()
      }
    });
  }

  obtener_tiposTramites() {
    this.tiposTramitesService.obtener_tiposTramites().subscribe(tiposTramites => {
      this.dataSource.data = tiposTramites
    });
  }
}
