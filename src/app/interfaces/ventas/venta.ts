import { DetalleVentaDTO } from './detalle-venta-dto';

export interface Venta {
  id: number;
  fechaVenta: string;
  totalCervezas: number;
  total: number;
  metodoPago: number;
  metodoEnvio: number;
  numeroTarjeta: string;
  productosPedido: DetalleVentaDTO[];
  estatusVenta: number;
}
