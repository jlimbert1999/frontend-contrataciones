import { RequerimientoModel } from "./requerimientos";

export interface TiposTramitesModel {
  id_tipoTramite?: string;
  nombre: string;
  activo: string;
  requerimientos: RequerimientoModel[]
}

