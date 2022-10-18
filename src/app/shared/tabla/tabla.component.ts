import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
  @Output() eventoPaginacion: EventEmitter<any>;

  constructor() {
    this.llamarEditar = new EventEmitter();
    this.eventoPaginacion = new EventEmitter()
  }

  ngOnInit(): void {



  }
  ngOnChanges(): void {
    console.log('tick');
    this.columsTable = this.displayedColumns.map((titulo: any) => titulo.key);
    this.columsTable.unshift('nro')
    this.columsTable.push('opciones')
    this.number_rows = this.total_filas
  }
  getPageDetails(event: any) {
    this.eventoPaginacion.emit(event)
  }
  editarDatos(datos: object) {
    this.llamarEditar.emit(datos);
  }

}
