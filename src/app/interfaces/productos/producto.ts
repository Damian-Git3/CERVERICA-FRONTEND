export interface Producto {
  id: number;
  nombre: string;
  especificaciones: string;
  precioPaquete1: number;
  precioPaquete6: number;
  precioPaquete12: number;
  precioPaquete24: number;
  lotesMinimos: number;
  lotesMaximos: number;
  imagen: string;
  rutaFondo: string;
  fecha_registrado: string;
  favorito: boolean;
  nuevo: boolean;
  cantidadEnStock: number;
  estaEnCarrito: boolean;
}
