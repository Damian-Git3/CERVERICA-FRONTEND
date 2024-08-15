import { Producto } from "../productos/producto";

export interface StockDTO {
    id: number,
    idReceta: number,
    receta: Producto
}
