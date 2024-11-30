export interface Cupon {
  id?: number;
  fechaCreacion: Date;
  fechaExpiracion: Date;
  codigo: string;
  tipo: string;
  paquete: number;
  cantidad: number;
  valor: number;
  usos: number;
  montoMaximo: number;
  montoMinimo: number;
  activo: boolean;
}
