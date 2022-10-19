import { UsuarioModel } from "./usuario.model"
import { DependenciaModel } from "./dependencia.model"
export interface CuentaModel {
    id_cuenta?: string
    funcionario: string
    dependencia:DataTransfer
    login: string
    password:string
    rol:string
}
export interface Cuenta {
    id_cuenta?: string
    funcionario: UsuarioModel
    dependencia:DependenciaModel
    login: string
    password:string
    rol:string
}