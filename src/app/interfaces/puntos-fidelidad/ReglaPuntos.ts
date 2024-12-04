export interface ReglaPuntos {
    id: number;
    valorMXNPunto?: number; // Propiedad opcional (nullable float en C#)
    montoMinimo: number; // decimal mapeado como number
    porcentajeConversion: number;
    fechaModificacion: string; // ISO 8601 format for DateTime
  }
  