import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }
  agregar_funcionario(funcionario: UsuarioModel) {
    return this.http.post<{ ok: boolean, funcionario: UsuarioModel }>(`${base_url}/usuarios`, funcionario).pipe(
      map(resp => {
        console.log(resp);
        return resp.funcionario
      })
    )
  }

  obtener_funcionarios() {
    return this.http.get<{ ok: boolean, funcionarios: UsuarioModel[], total: number }>(`${base_url}/usuarios`).pipe(
      map(resp => {
        console.log(resp);
        return { funcionarios: resp.funcionarios, total: resp.total }
      })
    )
  }
  editar_funcionario(id_funcionario:string,funcionario:UsuarioModel){
    return this.http.put<{ ok: boolean, funcionario: UsuarioModel }>(`${base_url}/usuarios/${id_funcionario}`, funcionario).pipe(
      map(resp => resp.funcionario)
    )
  }
  
}
