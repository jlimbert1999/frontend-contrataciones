import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InstitucionModel } from '../models/institucion.model';
import { InstitucionesService } from '../services/instituciones.service';
import { InstitucionDialogComponent } from './institucion-dialog/institucion-dialog.component';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {
  Instituciones: InstitucionModel[] = []
  Total: number = 0
  dataSource = new MatTableDataSource()
  displayedColumns = [
    { key: 'sigla', titulo: 'Sigla' },
    { key: 'nombre', titulo: 'Nombre' },
    { key: 'activo', titulo: 'Situacion' }
  ]
  @ViewChild("txtSearch") private searchInput: ElementRef;

  constructor(public dialog: MatDialog, public institucionesService: InstitucionesService) { }

  ngOnInit(): void {
    this.obtener_instituciones()

  }

  agregar_instituciones() {
    const dialogRef = this.dialog.open(InstitucionDialogComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((result: InstitucionModel) => {
      if (result) {
        this.Instituciones.push(result)
        this.Total = this.Total + 1
        this.dataSource.data = this.Instituciones

      }
    });
  }
  editar_institucion(data: any) {
    const dialogRef = this.dialog.open(InstitucionDialogComponent, {
      width: '700px',
      data
    });
    dialogRef.afterClosed().subscribe((result: InstitucionModel) => {
      if (result) {
        const foundIndex = this.Instituciones.findIndex(int => int.id_institucion == data.id_institucion);
        this.Instituciones[foundIndex] = result;
        this.dataSource.data = this.Instituciones

      }
    });
  }
  obtener_instituciones() {
    this.institucionesService.obtener_instituciones().subscribe(data => {
      this.Instituciones = data.instituciones
      this.Total = data.total
      this.dataSource.data = this.Instituciones
    })
  }
  buscar_institucion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.institucionesService.buscar_instituciones(filterValue.trim().toLowerCase()).subscribe(data => {
      this.Instituciones = data
      this.dataSource.data = this.Instituciones
    })
  }
  cambiar_paginacion(evento: any) {
    this.institucionesService.items_page = evento.pageSize
    this.institucionesService.pageIndex = evento.pageIndex
    if (evento.pageIndex > evento.previousPageIndex) {
      this.institucionesService.next_page()
    }
    else if (evento.pageIndex < evento.previousPageIndex) {
      this.institucionesService.previus_page()
    }

    this.obtener_instituciones()
  }

  activar_busqueda() {
    this.institucionesService.modo_busqueda = true
    setTimeout(() => {
      this.searchInput.nativeElement.focus()
    })
  }
  desactivar_busqueda() {
    this.institucionesService.termino_busqueda = ""
    this.institucionesService.modo_busqueda = false
    this.obtener_instituciones()
  }

}
