import { Cupon } from '../cupones/Cupon';
import { DetalleVentaDTO } from './detalle-venta-dto';

export interface Venta {
  id: number;
  fechaVenta: string;
  totalCervezas: number;
  metodoPago: number;
  metodoEnvio: number;
  montoVenta: number;
  numeroTarjeta: string;
  productosPedido: DetalleVentaDTO[];
  estatusVenta: number;
  cupon: Cupon | null;
}
