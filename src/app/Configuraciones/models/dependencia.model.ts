export interface DependenciaModel {
    id_dependencia?:string
    institucion: string,
    nombre: string,
    sigla: string,
    activo?:boolean
}

export interface DependenciaInterface {
    id_dependencia?:string
    institucion: {_id:string, nombre:string},
    nombre: string,
    sigla: string,
    activo?:boolean
}