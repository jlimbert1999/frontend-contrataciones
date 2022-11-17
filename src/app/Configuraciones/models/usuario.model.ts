export interface UsuarioModel {
    _id?: string
    nombre: string
    dni: string
    telefono: number
    direccion: string
    cargo: string
    estado?: boolean
}