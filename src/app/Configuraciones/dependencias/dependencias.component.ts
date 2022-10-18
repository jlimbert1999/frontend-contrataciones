import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DependenciaInterface, DependenciaModel } from '../models/dependencia.model';
import { DependenciasService } from '../services/dependencias.service';
import { DependenciaDialogComponent } from './dependencia-dialog/dependencia-dialog.component';

@Component({
  selector: 'app-dependencias',
  templateUrl: './dependencias.component.html',
  styleUrls: ['./dependencias.component.css']
})
export class DependenciasComponent implements OnInit {
  Dependencias: DependenciaInterface[] = []
  Total: number = 0
  dataSource = new MatTableDataSource()
  displayedColumns = [
    { key: 'sigla', titulo: 'Sigla' },
    { key: 'nombre', titulo: 'Nombre' },
    { key: 'institucion', titulo: 'Institucion' },
    { key: 'activo', titulo: 'Situacion' },
  ]
  @ViewChild("txtSearch") private searchInput: ElementRef;
  constructor(public dialog: MatDialog, public dependenciasService: DependenciasService) { }

  ngOnInit(): void {
    this.obtener_dependencias()
  }

  
  agregar_dependencia() {
    const dialogRef = this.dialog.open(DependenciaDialogComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((result: DependenciaInterface) => {
      if (result) {
       this.obtener_dependencias()

      }
    });
  }
  editar_dependencia(data: any) {
    const dialogRef = this.dialog.open(DependenciaDialogComponent, {
      width: '700px',
      data
    });
    dialogRef.afterClosed().subscribe((result: DependenciaInterface) => {
      if (result) {
       this.obtener_dependencias()

      }
    });
  }
  obtener_dependencias() {
    this.dependenciasService.obtener_dependencias().subscribe(data => {
      this.Dependencias = data.dependencias
      this.Total = data.total
      this.dataSource.data = this.Dependencias
    })
  }
  eliminar_dependencia(data:any){
    this.dependenciasService.cambiar_situacion_dependencia(data.id_dependencia, false).subscribe(message=>{
      const indexFound=this.Dependencias.findIndex(dep=>dep.id_dependencia==data.id_dependencia)
      this.Dependencias[indexFound].activo=false
      this.dataSource.data=this.Dependencias
    })
  }
  habilitar_dependencia(data:any){
    this.dependenciasService.cambiar_situacion_dependencia(data.id_dependencia, true).subscribe(message=>{
      const indexFound=this.Dependencias.findIndex(dep=>dep.id_dependencia==data.id_dependencia)
      this.Dependencias[indexFound].activo=true
      this.dataSource.data=this.Dependencias
    })
  }
  buscar_dependencia(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dependenciasService.buscar_dependencia(filterValue.trim().toLowerCase()).subscribe(data => {
      this.Dependencias = data
      this.dataSource.data = this.Dependencias
    })
  }
  cambiar_paginacion(evento: any) {
    this.dependenciasService.items_page = evento.pageSize
    this.dependenciasService.pageIndex = evento.pageIndex
    if (evento.pageIndex > evento.previousPageIndex) {
      this.dependenciasService.next_page()
    }
    else if (evento.pageIndex < evento.previousPageIndex) {
      this.dependenciasService.previus_page()
    }

    // this.obtener_dependencias()
  }

  activar_busqueda() {
    this.dependenciasService.modo_busqueda = true
    setTimeout(() => {
      this.searchInput.nativeElement.focus()
    })
  }
  desactivar_busqueda() {
    this.dependenciasService.termino_busqueda = ""
    this.dependenciasService.modo_busqueda = false
    this.obtener_dependencias()
  }

}
