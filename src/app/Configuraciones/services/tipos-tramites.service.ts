import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposTramitesModel } from '../models/tiposTramites.model';
import { RequerimientoModel } from '../models/requerimientos';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class TiposTramitesService {


  constructor(private http: HttpClient) { }
  agregar_tipoTramite(tipoTramite: TiposTramitesModel, requerimientos: RequerimientoModel[]) {
    return this.http.post<{ ok: boolean, funcionario: TiposTramitesModel }>(`${base_url}/tipos-tramites`, { nombre: tipoTramite.nombre, requerimientos }).pipe(
      map(resp => {
        console.log(resp);
        return resp.funcionario
      })
    )
  }

  obtener_tiposTramites() {
    return this.http.get<{ ok: boolean, tiposTramites: TiposTramitesModel[] }>(`${base_url}/tipos-tramites`).pipe(
      map(resp => resp.tiposTramites)
    )
  }
  // editar_funcionario(id_funcionario:string,funcionario:UsuarioModel){
  //   return this.http.put<{ ok: boolean, funcionario: UsuarioModel }>(`${base_url}/usuarios/${id_funcionario}`, funcionario).pipe(
  //     map(resp => resp.funcionario)
  //   )
  // }

  editar_requirimiento(id_tipoTramite: string, id_requerimiento: string, nombre: string) {
    return this.http.put<{ ok: boolean, message: string }>(`${base_url}/tipos-tramites/requerimientos/${id_tipoTramite}/${id_requerimiento}`, { nombre }).pipe(map(resp => resp.message))
  }
  cambiar_situacion_requerimiento(id_tipoTramite: string, id_requerimiento: string, activo: boolean) {
    return this.http.put<{ ok: boolean, message: string }>(`${base_url}/tipos-tramites/requerimientos/${id_tipoTramite}/${id_requerimiento}`, { activo }).pipe(map(resp => resp.message))
  }

}
