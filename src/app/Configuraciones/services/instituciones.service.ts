import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstitucionModel } from '../models/institucion.model';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  items_page: number = 5
  paginator: number = 0
  termino_busqueda: string = ""
  modo_busqueda: boolean = false
  pageIndex: number

  constructor(private http: HttpClient) { }

  agregar_institucion(institucion: InstitucionModel) {
    return this.http.post<{ ok: boolean, institucion: InstitucionModel }>(`${base_url}/instituciones`, institucion).pipe(
      map(resp => {
        console.log(resp);
        return resp.institucion
      })
    )
  }
  obtener_instituciones() {
    return this.http.get<{ ok: boolean, instituciones: InstitucionModel[], total: number }>(`${base_url}/instituciones?desde=${this.paginator}&filas=${this.items_page}`).pipe(
      map(resp => {
        return { instituciones: resp.instituciones, total: resp.total }
      })
    )
  }
  actualizar_institucion(id_institucion: string, institucion: InstitucionModel) {
    return this.http.put<{ ok: boolean, institucion: InstitucionModel }>(`${base_url}/instituciones/${id_institucion}`, institucion).pipe(
      map(resp => resp.institucion)
    )
  }
  buscar_instituciones(termino: string) {
    return this.http.get<{ ok: boolean, instituciones: InstitucionModel[] }>(`${base_url}/instituciones/${termino}`).pipe(
      map(resp => resp.instituciones)
    )
  }

  next_page() {
    this.paginator = this.paginator + this.items_page
  }

  previus_page() {
    this.paginator = this.paginator - this.items_page
  }

}
