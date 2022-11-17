import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TiposTramitesModel } from 'src/app/Configuraciones/models/tiposTramites.model';
import { environment } from 'src/environments/environment';
import { TramiteModel } from '../models/tramite.model';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

  constructor(private http: HttpClient) { }

  agregar_tramite(tramite: TramiteModel) {
    return this.http.post<{ ok: boolean, tramite: any }>(`${base_url}/tramites`, tramite).pipe(
      map(resp => {
        return resp.tramite
      })
    )
  }
  obtener_tramites() {
    return this.http.get<{ ok: boolean, tramites: any }>(`${base_url}/tramites`).pipe(
      map(resp => {
        return resp.tramites
      })
    )
  }
  editar_tramites(id_tramite: string, tramite: TramiteModel) {
    return this.http.put<{ ok: boolean, tramite: any }>(`${base_url}/tramites/${id_tramite}`, tramite).pipe(
      map(resp => {
        return resp.tramite
      })
    )
  }
  obtener_tramite(id_tramite: string) {
    return this.http.get<{ ok: boolean, data: { tramite: any, workflow: any } }>(`${base_url}/tramites/${id_tramite}`).pipe(
      map(resp => {
        return resp.data
      })
    )
  }

  obtener_control_tramites() {
    return this.http.get<{ ok: boolean, tramites: any }>(`${base_url}/tramites/control/registrados`).pipe(
      map(resp => {
        return resp.tramites
      })
    )
  }

  obtener_tipos_tramites() {
    return this.http.get<{ ok: boolean, tiposTramites: TiposTramitesModel[] }>(`${base_url}/tipos-tramites`).pipe(
      map(resp => {
        return resp.tiposTramites
      })
    )
  }

  filtrar_tramites(tipo_filtro: string, termino: string) {
    return this.http.get<{ ok: boolean, tramites: any }>(`${base_url}/tramites/filtrar/${termino}?tipo=${tipo_filtro}`).pipe(
      map(resp => {
        return resp.tramites
      })
    )
  }
}
