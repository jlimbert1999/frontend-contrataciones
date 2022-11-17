import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { elementAt, map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class BandejaService {

  constructor(private http: HttpClient) { }
  dataSource = new MatTableDataSource<any>();
  obtener_instituciones_envio() {
    return this.http.get<{ ok: boolean, instituciones: any }>(`${base_url}/bandejas/instituciones-envio`).pipe(
      map(resp => {
        return resp.instituciones
      })
    )
  }
  obtener_dependencias_envio(id_institucion: string) {
    return this.http.get<{ ok: boolean, dependencias: any }>(`${base_url}/bandejas/dependencias-envio/${id_institucion}`).pipe(
      map(resp => {
        return resp.dependencias
      })
    )
  }
  obtener_funcionarios_envio(id_dependencia: string) {
    return this.http.get<{ ok: boolean, funcionarios: any }>(`${base_url}/bandejas/funcionarios-envio/${id_dependencia}`).pipe(
      map(resp => {
        return resp.funcionarios
      })
    )
  }
  agregar_mail(mail: any) {
    return this.http.post<{ ok: boolean, tramite: any }>(`${base_url}/bandejas`, mail).pipe(
      map(resp => {
        return resp.tramite
      })
    )
  }
  obtener_bandejaEntrada() {
    return this.http.get<{ ok: boolean, tramites: any[] }>(`${base_url}/bandejas/entrada`).pipe(
      map(resp => {
        console.log(resp)
        let tramites: any[] = []
        resp.tramites.map(elememt => {
          elememt.tramite['id_tramite'] = elememt.tramite._id
          elememt.tramite.recibido = elememt.recibido
          elememt.tramite.cuenta_emisor = elememt.cuenta_emisor
          elememt.tramite.fecha_envio = elememt.fecha_envio
          delete elememt.tramite._id
          tramites.push(elememt.tramite)
        })
        this.dataSource.data = tramites
      })
    )

  }
  obtener_bandejaSalida() {
    return this.http.get<{ ok: boolean, tramites: any[] }>(`${base_url}/bandejas/salida`).pipe(
      map(resp => {
        console.log(resp)
        let tramites: any[] = []
        resp.tramites.map(elememt => {
          elememt.tramite['id_tramite'] = elememt.tramite._id
          elememt.tramite.aceptado = elememt.aceptado
          elememt.tramite.reenviado = elememt.reenviado
          elememt.tramite.rechazado = elememt.rechazado
          elememt.tramite.cuenta_receptor = elememt.cuenta_receptor
          elememt.tramite.fecha_envio = elememt.fecha_envio
          elememt.tramite.fecha_recibido = elememt.fecha_recibido
          delete elememt.tramite._id
          tramites.push(elememt.tramite)
        })
        return tramites
      })
    )
  }
  aceptar_tramite(id_tramite: string, cuenta_emisor: string, ubicacion: string) {
    return this.http.put<{ ok: boolean, message: string }>(`${base_url}/bandejas/aceptar/${id_tramite}`, { ubicacion, cuenta_emisor }).pipe(
      map(resp => {
        return resp.message
      })
    )
  }
  rechazar_tramite(id_tramite: string, cuenta_emisor: string) {
    return this.http.put<{ ok: boolean, message: string }>(`${base_url}/bandejas/rechazar/${id_tramite}`, { cuenta_emisor }).pipe(
      map(resp => {
        return resp.message
      })
    )
  }
}
