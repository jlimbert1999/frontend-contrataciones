export interface MailModel {
    cuenta_emisor?: string
    cuenta_receptor: string
    tramite: string
    motivo: string
    fecha_envio?: string
    recibido?: boolean
}