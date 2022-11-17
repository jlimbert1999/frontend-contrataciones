import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TramiteService } from '../services/tramite.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['origen', 'fecha_creacion', 'alterno', 'ubicacion', 'objeto', 'tipo_contratacion', 'precio', 'empresa_adjudicada', 'representante_legal', 'precio_adjudicado', 'estado', 'observaciones', 'plazo', 'nro_apertura', 'modalidad', 'cuce']
  tipos_filtro: string[] = ['Modalidad', 'Origen', 'Ubicacion']
  filtro: string
  constructor(private tramiteService: TramiteService) { }

  ngOnInit(): void {
    this.obtener_tramites()
  }
  obtener_tramites() {
    this.tramiteService.obtener_control_tramites().subscribe(tramites => {
      this.dataSource = new MatTableDataSource(tramites)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue !== '') {
      this.tramiteService.filtrar_tramites(this.filtro, filterValue).subscribe(tramites=>{
        this.dataSource = new MatTableDataSource(tramites)
      })
    }
   
  }


}
