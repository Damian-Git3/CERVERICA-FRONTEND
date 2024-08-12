import { Producto } from '../productos/producto';

export interface ProductoCarrito {
  id: number;
  idUsuario: string;
  idReceta: number;
  cantidadLote: number;
  cantidad: number;
  precioPaquete: number;
  receta: Producto;
}
