import { UsuarioModel } from "./usuario.model"

export interface CuentaModel {
    _id?: string
    dependencia: string
    login: string
    password: string
    rol: string
}

export interface CuentaModel_view extends UsuarioModel {
    cuenta?: { _id: string, login: string, rol: string, dependencia: { nombre: string, institucion: { sigla: string } } }

}

