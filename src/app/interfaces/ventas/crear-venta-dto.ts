import { DetalleVentaDTO } from './detalle-venta-dto';

export interface CrearVentaDTO {
  metodoPago?: number;
  metodoEnvio?: number;

  // ATRIBUTOS DIRECCIÓN ENVÍO
  nombrePersonaRecibe?: string;
  calle?: string;
  numeroCasa?: string;
  codigoPostal?: string;
  ciudad?: string;
  estado?: string;

  // ATRIBUTOS TARJETA
  nombrePersonaTarjeta?: string;
  numeroTarjeta?: string;
  mesExpiracion?: string;
  anioExpiracion?: string;
  cvv?: string;

  // DETALLES DE VENTA
  detalles?: DetalleVentaDTO[];
}
