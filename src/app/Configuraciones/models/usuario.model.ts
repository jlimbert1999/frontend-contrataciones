export interface UsuarioModel {
    id_funcionario?: string
    nombre: string
    dni:string
    telefonio:number
    direccion:string
    cargo: string
    estado?:boolean
}