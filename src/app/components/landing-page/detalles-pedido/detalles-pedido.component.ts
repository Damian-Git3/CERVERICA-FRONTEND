import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentasService } from '../../../services/ventas/ventas.service';
import { Venta } from '../../../interfaces/ventas/venta';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrl: './detalles-pedido.component.css',
})
export class DetallesPedidoComponent {
  idPedido: number | null = null;
  venta: Venta | null = null;

  _Route = inject(ActivatedRoute);
  _VentasService = inject(VentasService);

  cantidadTotalProductos: number = 0;
  totalPrecioCervezas: number = 0;
  cargandoPedido: boolean = false;

  ngOnInit(): void {
    const idParam = this._Route.snapshot.paramMap.get('id');
    this.idPedido = idParam ? parseInt(idParam, 10) : null;

    if (this.idPedido !== null) {
      this.cargandoPedido = true;

      this._VentasService.obtenerPedido(this.idPedido).subscribe({
        next: (venta) => {
          this.venta = venta;

          this.cantidadTotalProductos = this.venta.productosPedido.length;
          this.totalPrecioCervezas = this.venta.productosPedido.reduce(
            (total, detalle) => total + (detalle.montoVenta ?? 0), // Usa ?? 0 para proporcionar un valor predeterminado
            0
          );

          this.cargandoPedido = false;
        },
        error: (error) => {
          console.log(error);

          this.cargandoPedido = false;
        },
      });
    }
  }

  obtenerUltimosCuatroDigitosTarjeta(): string {
    const numeroTarjeta = this.venta?.numeroTarjeta || '';
    return numeroTarjeta.slice(-4).padStart(numeroTarjeta.length, '*');
  }
}
