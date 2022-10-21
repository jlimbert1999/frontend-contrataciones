import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposTramitesModel } from '../models/tiposTramites.model';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class TiposTramitesService {


  constructor(private http:HttpClient) { }
  agregar_tipoTramite(tipoTramite: TiposTramitesModel) {
    return this.http.post<{ ok: boolean, funcionario: TiposTramitesModel }>(`${base_url}/tipos-tramites`, tipoTramite).pipe(
      map(resp => {
        console.log(resp);
        return resp.funcionario
      })
    )
  }

  obtener_tiposTramites() {
    return this.http.get<{ ok: boolean, tiposTramites: TiposTramitesModel[]}>(`${base_url}/tipos-tramites`).pipe(
      map(resp => resp.tiposTramites)
    )
  }
  // editar_funcionario(id_funcionario:string,funcionario:UsuarioModel){
  //   return this.http.put<{ ok: boolean, funcionario: UsuarioModel }>(`${base_url}/usuarios/${id_funcionario}`, funcionario).pipe(
  //     map(resp => resp.funcionario)
  //   )
  // }
  
}
