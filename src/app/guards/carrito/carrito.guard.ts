import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CarritoService } from '../../services/carrito/carrito.service';
import { CompartidoService } from '../../services/compartido/compartido.service';
import { ProductoCarrito } from '../../interfaces/carrito/producto-carrito';
import { CantidadCervezasReceta } from '../../interfaces/carrito/cantidad-cervezas-receta';

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

            const recetasAgrupadas: { [key: number]: CantidadCervezasReceta } =
              {};

            productosCarrito.forEach((productoCarrito) => {
              const idReceta = productoCarrito.idReceta;
              const cantidadTotal =
                productoCarrito.cantidadPaquete * productoCarrito.cantidad;

              if (recetasAgrupadas[idReceta]) {
                recetasAgrupadas[idReceta].cantidadTotalCervezas +=
                  cantidadTotal;
              } else {
                recetasAgrupadas[idReceta] = {
                  idReceta: idReceta,
                  cantidadTotalCervezas: cantidadTotal,
                };
              }
            });

            const arrayCantidadCervezasReceta: CantidadCervezasReceta[] =
              Object.values(recetasAgrupadas);

            _CarritoService.asignarListaCantidadTotalCervezasCarrito(
              arrayCantidadCervezasReceta,
            );
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
