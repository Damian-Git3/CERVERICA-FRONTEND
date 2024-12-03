import { Producto } from '../productos/producto';

export interface ProductoCarrito {
  id: number;
  cantidadPaquete: number;
  cantidad: number;
  precioPaquete: number;
  receta: Producto;

  idUsuario: string;
  idCarrito: number;
  idReceta: number;
}
