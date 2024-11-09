import { Component, inject, ViewChild } from '@angular/core';
import { Venta } from '../../../../interfaces/ventas/venta';
import { VentasService } from '../../../../services/ventas/ventas.service';
import { finalize } from 'rxjs';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { CompartidoService } from '../../../../services/compartido/compartido.service';
import { Dialog } from 'primeng/dialog';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
})
export class TablaComponent {
  @ViewChild('modal') modal!: Dialog;

  _VentasService = inject(VentasService);
  _AlertasService = inject(AlertasService);
  _CompartidoService = inject(CompartidoService);
  _title = inject(Title);

  cargando: boolean = false;
  ventas!: Venta[];
  ventasFiltradas!: Venta[];

  ngOnInit(): void {
    this._CompartidoService.actualizarTitulo('Ventas');
    this._title.setTitle('Ventas');
    this.obtenerVentas();
  }

  obtenerVentas() {
    this.cargando = true;

    this._VentasService
      .obtenerVentas()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (ventas) => {
          this.ventas = ventas;
          this.ventasFiltradas = ventas;
        },
        error: (error: any) => {
          this._AlertasService.showError(
            'No se pudo obtener las ventas, intenta nuevamente',
            'Ocurrió un problema'
          );
          console.error(error);
        },
      });
  }

  retrocederPaso(idVenta: number) {
    this.cargando = true;

    +this._VentasService
      .anteriorEstatus(idVenta)
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: () => {
          this._AlertasService.showSuccess(
            'Se retrocedio al paso anterior con éxito!',
            'Retrocediste un paso'
          );

          this.obtenerVentas();
        },
        error: (error: any) => {
          this._AlertasService.showError(
            'Error al retroceder el estatus, intenta nuevamente'
          );
          console.error(error);
        },
      });
  }

  filtrarVentas(event: any) {
    const query = event.target.value.toLowerCase();
    this.ventasFiltradas = this.ventas.filter(
      (venta) =>
        venta.fechaVenta.toLowerCase().includes(query) ||
        venta.totalCervezas.toString().toLowerCase().includes(query) ||
        this.obtenerMetodoPago(venta.metodoPago)
          .toLowerCase()
          .includes(query) ||
        this.obtenerMetodoEnvio(venta.metodoEnvio)
          .toLowerCase()
          .includes(query) ||
        venta.total.toString().toLowerCase().includes(query)
    );
  }

  obtenerNombreEstatusVenta(estatusVenta: number) {
    switch (estatusVenta) {
      case 1:
        return 'Recibido ✅';
      case 2:
        return 'Empaquetando 📦';
      case 3:
        return 'Listo 🚚';
      default:
        return 'Estatus desconocido';
    }
  }

  obtenerSeverityEstatusVenta(
    estatusVenta: number
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'contrast'
    | undefined {
    switch (estatusVenta) {
      case 1:
        return 'info';
      case 2:
        return 'warning';
      case 3:
        return 'success';
      default:
        return 'contrast';
    }
  }

  obtenerMetodoEnvio(metodoEnvio: number): string {
    switch (metodoEnvio) {
      case 1:
        return 'Recoger en tienda 🏭';
      case 2:
        return 'Envio domicilio 🚚';
      default:
        return 'Método de envio Desconocido';
    }
  }

  obtenerMetodoPago(metodoPago: number): string {
    switch (metodoPago) {
      case 1:
        return 'Contraentrega 💵';
      case 2:
        return 'Tarjeta de credito 💳';
      default:
        return 'Método de pago Desconocido';
    }
  }
}
