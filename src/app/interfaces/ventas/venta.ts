import { DetalleVentaDTO } from './detalle-venta-dto';

export interface Venta {
  id: number,
  fechaVenta: string,
  totalCervezas: number,
  metodoPago: number,
  metodoEnvio: number,
  estatusVenta: number,
  montoVenta: number,
  numeroTarjeta: string,
  productosPedido: DetalleVentaDTO[]
}
