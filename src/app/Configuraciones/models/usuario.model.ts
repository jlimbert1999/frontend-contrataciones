export interface UsuarioModel {
    id_funcionario?: string
    nombre: string
    dni:string
    telefono:number
    direccion:string
    cargo: string
    estado?:boolean
}