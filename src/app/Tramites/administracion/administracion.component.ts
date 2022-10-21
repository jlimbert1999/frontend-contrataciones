import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TramiteDialogComponent } from './tramite-dialog/tramite-dialog.component';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns=['alterno', 'ubicacion', 'objeto', 'presupuesto', 'plazo', 'nro_apertura', 'modalidad']
  constructor(   public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  agregar_tramite() {
    const dialogRef = this.dialog.open(TramiteDialogComponent, {
      data: {}
    });
    
  }

}
