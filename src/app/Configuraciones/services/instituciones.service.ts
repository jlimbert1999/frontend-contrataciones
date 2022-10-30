import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstitucionModel } from '../models/institucion.model';
import { PaginationService } from './pagination.service';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {

  termino_busqueda: string = ""
  modo_busqueda: boolean = false
  pageIndex: number

  constructor(private http: HttpClient, private paginationService: PaginationService) { }

  agregar_institucion(institucion: InstitucionModel) {
    return this.http.post<{ ok: boolean, institucion: InstitucionModel }>(`${base_url}/instituciones`, institucion).pipe(
      map(resp => {
        this.paginationService.dataSize += 1
        return resp.institucion
      })
    )
  }
  obtener_instituciones() {
    return this.http.get<{ ok: boolean, instituciones: InstitucionModel[], total: number }>(`${base_url}/instituciones?pageIndex=${this.paginationService.pageIndex}&rows=${this.paginationService.rows}`).pipe(
      map(resp => {
        this.paginationService.dataSize = resp.total
        return resp.instituciones
      })
    )
  }
  actualizar_institucion(id_institucion: string, institucion: InstitucionModel) {
    return this.http.put<{ ok: boolean, institucion: InstitucionModel }>(`${base_url}/instituciones/${id_institucion}`, institucion).pipe(
      map(resp => resp.institucion)
    )
  }
  habilitar(id_institucion: string) {
    return this.http.put<{ ok: boolean, institucion: InstitucionModel }>(`${base_url}/instituciones/${id_institucion}`, { activo: true }).pipe(
      map(resp => resp.institucion)
    )
  }
  eliminar(id_institucion: string) {
    return this.http.put<{ ok: boolean, institucion: InstitucionModel }>(`${base_url}/instituciones/${id_institucion}`, { activo: false }).pipe(
      map(resp => resp.institucion)
    )
  }
  buscar_instituciones(termino: string) {
    return this.http.get<{ ok: boolean, instituciones: InstitucionModel[], total: number }>(`${base_url}/instituciones/${termino}`).pipe(
      map(resp => {
        this.paginationService.dataSize = resp.total
        return resp.instituciones
      })
    )
  }

}
