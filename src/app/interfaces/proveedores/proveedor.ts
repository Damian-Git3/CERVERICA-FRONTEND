export interface Proveedor {
  id: number;
  empresa: string;
  telefono: string;
  direccion: string;
  email?: string;
  nombreContacto: string;
  activo: boolean;
}
