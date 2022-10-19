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
  agregar_cuenta(cuenta: CuentaModel, funcionario:UsuarioModel) {
    return this.http.post<{ ok: boolean, cuenta: CuentaModel }>(`${base_url}/cuentas`, {cuenta, funcionario}).pipe(
      map(resp => {
        console.log(resp);
        return resp.cuenta
      })
    )
  }
  obtener_cuentas(){
    return this.http.get<{ ok: boolean, cuentas: Cuenta[]}>(`${base_url}/cuentas`).pipe(
      map(resp => {
        return resp.cuentas
      })
    )
  }

}
