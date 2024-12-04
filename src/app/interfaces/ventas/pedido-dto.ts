import { Cupon } from '../cupones/Cupon';

export interface PedidoDTO {
  id: number;
  fechaVenta: string;
  totalCervezas: number;
  metodoPago: number;
  total: number;
  metodoEnvio: number;
  estatusVenta: number;
  cupon: Cupon; 
}
