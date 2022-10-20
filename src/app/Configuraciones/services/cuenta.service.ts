import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cuenta, CuentaModel } from '../models/cuenta.mode';
import { UsuarioModel } from '../models/usuario.model';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http:HttpClient) { }
  obtener_dependencias_hablitadas(){
    return this.http.get<{ ok: boolean, dependencias: {id_dependencia:string, nombre:string}[]}>(`${base_url}/cuentas/dependencias`).pipe(
      map(resp => {
        return resp.dependencias
      })
    )
  }
  obtener_funcionarios_asignacion(){
    return this.http.get<{ ok: boolean, funcionarios: {id_funcionario:string, nombre:string, cargo:string, dni:string}[]}>(`${base_url}/cuentas/usuarios`).pipe(
      map(resp => {
        return resp.funcionarios
      })
    )
  }
  agregar_cuenta(cuenta: CuentaModel, funcionario:UsuarioModel) {
    return this.http.post<{ ok: boolean, cuenta: CuentaModel }>(`${base_url}/cuentas`, {cuenta, funcionario}).pipe(
      map(resp => {
        console.log(resp);
        return resp.cuenta
      })
    )
  }
  editar_cuenta(id_cuenta:string,cuenta:CuentaModel){
    return this.http.put<{ ok: boolean, cuenta: CuentaModel }>(`${base_url}/cuentas/${id_cuenta}`, cuenta).pipe(
      map(resp =>  resp.cuenta)
    )
  }

  obtener_cuentas(){
    return this.http.get<{ ok: boolean, cuentas: Cuenta[]}>(`${base_url}/cuentas`).pipe(
      map(resp => {
        return resp.cuentas
      })
    )
  }


  asignar_cuenta(id_cuenta:string, id_funcionarioActual:string, id_funcionarioNuevo:string){
    return this.http.put<{ ok: boolean, cuenta: CuentaModel }>(`${base_url}/cuentas/asignar/${id_cuenta}`, {id_funcionarioActual, id_funcionarioNuevo}).pipe(
      map(resp =>  resp.cuenta)
    )
  }

}
