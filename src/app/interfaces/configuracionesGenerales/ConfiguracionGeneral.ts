export interface ConfiguracionesGenerales {
    id: number;
    minimoCompraEnvioGratis: number;
    promocionesAutomaticas: boolean;
    notificacionPromocionesWhatsApp: boolean;
    notificacionPromocionesEmail: boolean;
    tiempoRecordatorioCarritoAbandonado: number;
    tiempoRecordatorioRecomendacionUltimaCompra: number;
    fechaModificacion: string;
    frecuenciaReclasificacionClientes: number;
    frecuenciaMinimaMensualClienteFrecuente: number;
    tiempoSinComprasClienteInactivo: number;
  }
  