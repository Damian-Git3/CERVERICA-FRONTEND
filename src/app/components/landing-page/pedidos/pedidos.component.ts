import { Component, inject } from '@angular/core';
import { VentasService } from '../../../services/ventas/ventas.service';
import { PedidoDTO } from '../../../interfaces/ventas/pedido-dto';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  _VentasService = inject(VentasService);

  pedidosUsuario: PedidoDTO[] = [];

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this._VentasService.obtenerPedidosUsuario().subscribe({
      next: (pedidosUsuario) => {
        this.pedidosUsuario = pedidosUsuario;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
