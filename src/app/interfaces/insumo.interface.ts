export interface IInsumo {
  id: number;
  nombre: string;
  descripcion: string;
  unidadMedida: string;
  cantidadMaxima: number;
  cantidadMinima: number;
  costoUnitario: number;
  merma: number;
  activo: boolean;
  cantidadTotalLotes: number;
}
