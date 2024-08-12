import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CarritoService } from '../../services/carrito/carrito.service';
import { CompartidoService } from '../../services/compartido/compartido.service';
import { ProductoCarrito } from '../../interfaces/carrito/producto-carrito';

export const carritoGuard: CanActivateFn = (route, state) => {
  let _CarritoService = inject(CarritoService);
  let _CompartidoService = inject(CompartidoService);

  if (_CompartidoService.obtenerSesion() != null) {
    if (JSON.parse(localStorage.getItem('usuarioSesion')!) != null) {
      _CarritoService
        .obtenerProductosCarrito(_CompartidoService.obtenerSesion().token)
        .subscribe({
          next: (productosCarrito: ProductoCarrito[]) => {
            _CarritoService.asignarListaProductosCarrito(productosCarrito);
          },
          error: (e) => {
            if (e.status == 401) {
              _CompartidoService.tokenExpirado();
            }

            console.log(e);
          },
        });
    }
  }

  return true;
};
