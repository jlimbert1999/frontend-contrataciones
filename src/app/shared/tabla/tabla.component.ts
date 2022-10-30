import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService } from 'src/app/Configuraciones/services/pagination.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @Input() dataSource = new MatTableDataSource<any>();
  @Input() displayedColumns: { key: string, titulo: string }[] = []
  columsTable: string[] = []
  number_rows: number = 0
  @Input() total_filas: number

  @Output() llamarEditar: EventEmitter<object>;
  @Output() llamarEliminar: EventEmitter<object>;
  @Output() llamarHabilitar: EventEmitter<object>;

  @Output() eventoPaginacion: EventEmitter<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public paginationService: PaginationService) {
    this.llamarEditar = new EventEmitter();
    this.llamarEliminar = new EventEmitter()
    this.llamarHabilitar = new EventEmitter()
    this.eventoPaginacion = new EventEmitter()
  }

  ngOnInit(): void {
  }



  ngOnChanges(): void {
    this.columsTable = this.displayedColumns.map((titulo: any) => titulo.key);
    this.columsTable.unshift('nro')
    this.columsTable.push('opciones')
    this.number_rows = this.total_filas
  }
  getPageDetails(event: PageEvent) {
    this.paginationService.pageIndex = event.pageIndex
    this.paginationService.rows = event.pageSize
    this.eventoPaginacion.emit(event)
  }
  editarDatos(datos: object) {
    this.llamarEditar.emit(datos);
  }
  eliminarDatos(datos: object) {
    this.llamarEliminar.emit(datos)
  }
  habilitarDatos(datos: object) {
    this.llamarHabilitar.emit(datos)
  }

}
