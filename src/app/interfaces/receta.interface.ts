export interface IReceta {
  id?: number;
  litrosEstimados: number;
  precioLitro: number;
  descripcion: string;
  nombre: string;
  costoProduccion: number;
  imagen: string;
  rutaFondo: string;
  fechaRegistrado: string;
  activo?: boolean;
  ingredientesReceta: IIngredienteReceta[];
}

export interface IIngredienteReceta {
  idInsumo: number;
  cantidad: number;
}
