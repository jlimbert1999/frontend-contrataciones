import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DependenciaInterface, DependenciaModel } from '../models/dependencia.model';
import { PaginationService } from './pagination.service';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class DependenciasService {

  termino_busqueda: string = ""
  modo_busqueda: boolean = false



  constructor(private http: HttpClient, private paginationService: PaginationService) { }
  agregar_dependencia(dependencia: DependenciaModel) {
    return this.http.post<{ ok: boolean, dependencia: DependenciaModel }>(`${base_url}/dependencias`, dependencia).pipe(
      map(resp => resp.dependencia)
    )
  }
  obtener_instituciones_habilitadas() {
    return this.http.get<{ ok: boolean, instituciones: { id_institucion: string, nombre: string }[] }>(`${base_url}/dependencias/instituciones/registro`).pipe(
      map(resp => { console.log(resp); return resp.instituciones })
    )
  }
  obtener_dependencias() {
    return this.http.get<{ ok: boolean, dependencias: DependenciaInterface[], total: number }>(`${base_url}/dependencias?pageIndex=${this.paginationService.pageIndex}&rows=${this.paginationService.rows}`).pipe(
      map(resp => {
        this.paginationService.dataSize = resp.total
        return resp.dependencias
      })
    )
  }
  actualizar_dependencia(id_dependencia: string, dependencia: { nombre: string, sigla: string }) {
    return this.http.put<{ ok: boolean, dependencia: DependenciaModel }>(`${base_url}/dependencias/${id_dependencia}`, dependencia).pipe(
      map(resp => resp.dependencia)
    )
  }
  cambiar_situacion_dependencia(id_dependencia: string, activo: boolean) {
    return this.http.put<{ ok: boolean, message: string }>(`${base_url}/dependencias/situacion/${id_dependencia}`, { activo }).pipe(
      map(resp => resp.message)
    )
  }
  habilitar_dependencia(id_dependencia: string) {
    return this.http.delete<{ ok: boolean, message: string }>(`${base_url}/dependencias/${id_dependencia}`).pipe(
      map(resp => resp.message)
    )
  }

  buscar_dependencia(termino: string) {
    return this.http.get<{ ok: boolean, dependencias: DependenciaInterface[] }>(`${base_url}/dependencias/${termino}`).pipe(
      map(resp => resp.dependencias)
    )
  }

}
