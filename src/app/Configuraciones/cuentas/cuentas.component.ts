import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Cuenta, CuentaModel } from '../models/cuenta.mode';
import { CuentaService } from '../services/cuenta.service';
import { CuentaDialogComponent } from './cuenta-dialog/cuenta-dialog.component';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  Cuentas: Cuenta[] = []
  Total: number = 0
  dataSource = new MatTableDataSource()
  displayedColumns = ['nro','login','funcionario', 'cargo','dependencia', 'rol', 'opciones']
   
  @ViewChild("txtSearch") private searchInput: ElementRef;
  constructor(public dialog: MatDialog, private cuentaService:CuentaService) { }

  ngOnInit(): void {
    this.obtener_cuentas()
  }
  agregar_cuenta() {
    const dialogRef = this.dialog.open(CuentaDialogComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.obtener_cuentas()
      }
    });
  }
  obtener_cuentas(){
    this.cuentaService.obtener_cuentas().subscribe(cuentas=>{
      this.Cuentas=cuentas
      this.dataSource.data=this.Cuentas
    })

  }
  editar_cuenta(data:any){
    const dialogRef = this.dialog.open(CuentaDialogComponent, {
      width: '1000px',
      data
    });
    dialogRef.afterClosed().subscribe((result: CuentaDialogComponent) => {
      if (result) {
       this.obtener_cuentas()

      }
    });
  }

}
