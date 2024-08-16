import { StockDTO } from '../stock/stock-dto';

export interface DetalleVentaDTO {
  id?: number;
  idReceta: number;
  cantidad: number;
  montoVenta?: number;
  pack: number;
  stock?: StockDTO;
}
