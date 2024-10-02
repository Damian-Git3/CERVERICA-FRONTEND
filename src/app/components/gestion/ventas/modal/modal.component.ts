import {
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { Venta } from '../../../../interfaces/ventas/venta';
import { DetalleVentaDTO } from '../../../../interfaces/ventas/detalle-venta-dto';
import { VentasService } from '../../../../services/ventas/ventas.service';
import { finalize } from 'rxjs';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @ViewChild('modal') modal!: Dialog;
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  _VentasService = inject(VentasService);
  _AlertasService = inject(AlertasService);

  public mostrarModal: boolean = false;
  cargando: boolean = false;
  ventaSeleccionada!: Venta | undefined;
  empaquetandoPedidos: boolean = false;
  habilitarMarcarListo: boolean = false;
  cantidadTotalDetalles: number = 0;

  // Listas para el pickList
  productosDisponibles: DetalleVentaDTO[] = [];
  productosEmpaquetados: DetalleVentaDTO[] = [];

  ocultar() {
    this.mostrarModal = false;
    this.reload.emit();
  }

  mostrar(venta?: Venta) {
    this.mostrarModal = true;
    this.ventaSeleccionada = venta;
    this.habilitarMarcarListo = false;
    this.empaquetandoPedidos = false;
    this.cantidadTotalDetalles = 0;
    this.productosEmpaquetados = [];

    if (venta) {
      if (venta.estatusVenta == 2) {
        this.empaquetandoPedidos = true;
        this.modal.header = 'Empaquetando venta';
      } else if (venta.estatusVenta == 1) {
        this.modal.header = 'Empezar empaquetar venta';
      }

      this.productosDisponibles = this.ventaSeleccionada?.productosPedido || [];
      this.cantidadTotalDetalles = this.productosDisponibles.length;
    }
  }

  verificarProductosEmpaquetados() {
    if (this.productosEmpaquetados.length == this.cantidadTotalDetalles) {
      this.habilitarMarcarListo = true;
    } else {
      this.habilitarMarcarListo = false;
    }
  }

  empezarEmpaquetar() {
    this.cargando = true;

    if (this.ventaSeleccionada) {
      this._VentasService
        .siguienteEstatusLanding(this.ventaSeleccionada.id)
        .pipe(finalize(() => (this.cargando = false)))
        .subscribe({
          next: () => {
            this._AlertasService.showSuccess(
              'Empezaste a empaquetar este pedido',
              'Estatus cambiado con éxito!',
            );

            this.empaquetandoPedidos = true;
          },
          error: (error: any) => {
            this._AlertasService.showError(
              'Error al cambiar el estatus, intenta nuevamente',
            );
            console.error(error);
          },
        });
    }
  }

  finalizarVenta() {
    this.cargando = true;

    if (this.ventaSeleccionada) {
      this._VentasService
        .siguienteEstatusLanding(this.ventaSeleccionada.id)
        .pipe(finalize(() => (this.cargando = false)))
        .subscribe({
          next: () => {
            this._AlertasService.showSuccess(
              'Finalizaste con éxito la venta!',
              'Venta finalizada',
            );

            this.ocultar();
          },
          error: (error: any) => {
            this._AlertasService.showError(
              'Error al cambiar el estatus, intenta nuevamente',
            );
            console.error(error);
          },
        });
    }
  }
}
