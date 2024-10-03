import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductoCarrito } from '../../../../interfaces/carrito/producto-carrito';
import { CarritoService } from '../../../../services/carrito/carrito.service';
import { CompartidoService } from '../../../../services/compartido/compartido.service';
import { EliminarProductoCarritoDTO } from '../../../../interfaces/carrito/eliminar-producto-carrito-dto';
import { MessageService } from 'primeng/api';
import { ActualizarProductoCarritoDTO } from '../../../../interfaces/carrito/actualizar-producto-carrito-dto';
import { Producto } from '../../../../interfaces/productos/producto';
import { CantidadCervezasReceta } from '../../../../interfaces/carrito/cantidad-cervezas-receta';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css',
})
export class RecetaComponent {
  @Input() producto!: Producto;
  @Input() productoCarrito!: ProductoCarrito;
  @Output() eliminarProductoCarritoEvent = new EventEmitter<ProductoCarrito>();

  _CarritoService = inject(CarritoService);
  _CompartidoService = inject(CompartidoService);
  _MessageService = inject(MessageService);

  private productosCarrito: ProductoCarrito[] = [];
  private actualizarProductoCarritoTimeout: any;
  private cantidadTotalCervezasEnCarritoPorReceta: CantidadCervezasReceta[] =
    [];
  private cantidadCervezasReceta: any;

  eliminandoReceta: boolean = false;

  ngOnInit(): void {
    this._CarritoService.ProductosCarrito.subscribe(
      (productosCarrito) => (this.productosCarrito = productosCarrito),
    );

    this._CarritoService.CantidadTotalCervezasEnCarritoPorReceta.subscribe(
      (cantidadTotalCervezasEnCarritoPorReceta) => {
        this.cantidadTotalCervezasEnCarritoPorReceta =
          cantidadTotalCervezasEnCarritoPorReceta;

        this.cantidadCervezasReceta =
          this._CarritoService.obtenerCantidadCervezasCarrito(
            this.productoCarrito.idReceta,
          );
      },
    );
  }

  eliminarProductoCarrito() {
    this.eliminandoReceta = true;

    let productoCarritoEliminar: EliminarProductoCarritoDTO = {
      idReceta: this.productoCarrito.idReceta,
      cantidadLote: this.productoCarrito.cantidadLote,
    };

    this._CarritoService
      .eliminarProductoCarrito(
        productoCarritoEliminar,
        this._CompartidoService.obtenerSesion().token,
      )
      .pipe(finalize(() => (this.eliminandoReceta = false)))
      .subscribe({
        next: () => {
          this._MessageService.add({
            severity: 'success',
            summary: 'Producto eliminado correctamente!',
            detail: 'Haz eliminado correctamente el producto de tu carrito',
          });
          this._CarritoService.eliminarListaProductosCarrito(
            this.productoCarrito,
          );
        },
        error: (error) => {
          if (error.status == 401) {
            this._CompartidoService.tokenExpirado();
          } else {
            console.error('Error al eliminar producto carrito:', error);
          }
        },
      });
  }

  disminuirCantidad() {
    if (this.esCantidadDisminuible()) {
      this.cantidadCervezasReceta.cantidadTotalCervezas -=
        this.productoCarrito.cantidadLote;
      this.productoCarrito.cantidad--;
      this._CarritoService.actualizarCantidadTotalCervezasCarrito(
        this.cantidadCervezasReceta,
      );
      this.actualizarProductoCarritoConRetraso();
    }
  }

  aumentarCantidad() {
    if (this.esCantidadAumentable()) {
      this.cantidadCervezasReceta.cantidadTotalCervezas +=
        this.productoCarrito.cantidadLote;
      this.productoCarrito.cantidad++;
      this._CarritoService.actualizarCantidadTotalCervezasCarrito(
        this.cantidadCervezasReceta,
      );
      this.actualizarProductoCarritoConRetraso();
    }
  }

  esCantidadDisminuible(): boolean {
    return (
      this.productoCarrito.cantidad != 1 &&
      this.cantidadCervezasReceta.cantidadTotalCervezas -
        this.productoCarrito.cantidadLote <=
        this.producto.cantidadEnStock
    );
  }

  esCantidadAumentable(): boolean {
    return (
      this.cantidadCervezasReceta.cantidadTotalCervezas +
        this.productoCarrito.cantidadLote <=
      this.producto.cantidadEnStock
    );
  }

  actualizarProductoCarritoConRetraso() {
    if (this.actualizarProductoCarritoTimeout) {
      clearTimeout(this.actualizarProductoCarritoTimeout);
    }

    this.actualizarProductoCarritoTimeout = setTimeout(() => {
      this.actualizarProductoCarrito();
    }, 1250);
  }

  actualizarProductoCarrito() {
    let productoCarritoActualizar: ActualizarProductoCarritoDTO = {
      idReceta: this.productoCarrito.receta.id,
      cantidadLote: this.productoCarrito.cantidadLote,
      cantidad: this.productoCarrito.cantidad,
    };

    this._CarritoService
      .actualizarProductoCarrito(
        productoCarritoActualizar,
        this._CompartidoService.obtenerSesion().token,
      )
      .subscribe({
        next: (productoCarrito: ProductoCarrito) => {
          this._CarritoService.actualizarListaProductosCarrito(productoCarrito);

          this._MessageService.add({
            severity: 'success',
            summary: 'Producto actualizado',
            detail: 'Producto correctamente actualizado',
          });
        },
        error: (e) => {
          if (e.status == 401) {
            this._CompartidoService.tokenExpirado();
          } else {
            console.error('Error al actualizar producto en el carrito:', e);

            this._MessageService.add({
              severity: 'error',
              summary: 'Problema al actualizar',
              detail:
                'Ocurrio un problema al actualizar el producto, intentalo de nuevo',
            });
          }
        },
      });
  }
}
