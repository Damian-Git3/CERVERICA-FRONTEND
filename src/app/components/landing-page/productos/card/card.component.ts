import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Producto } from '../../../../interfaces/productos/producto';
import { FavoritosService } from '../../../../services/favoritos/favoritos.service';
import { FavoritoUsuario } from '../../../../interfaces/favoritos/favorito-usuario';
import { ProductoCarrito } from '../../../../interfaces/carrito/producto-carrito';
import { FavoritoUsuarioAgregarDTO } from '../../../../interfaces/favoritos/favorito-usuario-agregar-dto';
import { CompartidoService } from '../../../../services/compartido/compartido.service';
import { CarritoService } from '../../../../services/carrito/carrito.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActualizarProductoCarritoDTO } from '../../../../interfaces/carrito/actualizar-producto-carrito-dto';
import { AgregarProductoCarritoDTO } from '../../../../interfaces/carrito/agregar-producto-carrito-dto';
import { CantidadCervezasReceta } from '../../../../interfaces/carrito/cantidad-cervezas-receta';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @ViewChild('CartButtonElement') CartButtonElement!: ElementRef;
  @ViewChild('CantidadElement') CantidadElement!: ElementRef;
  @Input() producto!: Producto;
  @Input() favoritosUsuario!: FavoritoUsuario[];
  @Output() agregarFavorito = new EventEmitter<FavoritoUsuario>();
  @Output() agregarProductoCarrito = new EventEmitter<ProductoCarrito>();
  @Output() actualizarProductoCarrito = new EventEmitter<ProductoCarrito>();
  @Output() eliminarFavorito = new EventEmitter<number>();
  @Output() actualizarProductos = new EventEmitter<void>();

  _CompartidoService = inject(CompartidoService);
  _CarritoService = inject(CarritoService);
  _MessageService: MessageService = inject(MessageService);
  _favoritosService: FavoritosService = inject(FavoritosService);
  _Router: Router = inject(Router);
  paqueteSeleccionado: number = 1;
  cantidadPaquetes: number = 1;
  precioMostrar: number = 1;
  enviandoProductoACarrito: boolean = false;
  private cantidadTotalCervezasEnCarritoPorReceta: CantidadCervezasReceta[] =
    [];
  private cantidadCervezasReceta: any = {
    idReceta: 0,
    cantidadTotalCervezas: this.paqueteSeleccionado,
  };
  private productoEnCarrito: boolean = true;
  productosCarrito: ProductoCarrito[] = [];

  ngOnInit(): void {
    this.paqueteSeleccionado = this.obtenerPaqueteSeleccionado();
    this.cantidadPaquetes = this.obtenerCantidadEnCarrito();
    this.precioMostrar = this.obtenerPrecioPaquete();

    this._CarritoService.ProductosCarrito.subscribe((productosCarrito) => {
      this.productosCarrito = productosCarrito;
    });

    this._CarritoService.CantidadTotalCervezasEnCarritoPorReceta.subscribe(
      (cantidadTotalCervezasEnCarritoPorReceta) => {
        this.cantidadCervezasReceta.cantidadTotalCervezasEnCarritoPorReceta =
          cantidadTotalCervezasEnCarritoPorReceta;

        this.cantidadCervezasReceta =
          this._CarritoService.obtenerCantidadCervezasCarrito(this.producto.id);

        if (this.cantidadCervezasReceta == undefined) {
          this.productoEnCarrito = false;

          this.cantidadCervezasReceta = {
            idReceta: this.producto.id,
            cantidadTotalCervezas: this.paqueteSeleccionado,
          };
        }
      },
    );
  }

  obtenerPaqueteSeleccionado(): number {
    const productoCarrito = this.productosCarrito.find(
      (productoCarrito) => productoCarrito.idReceta === this.producto.id,
    );

    if (productoCarrito) {
      return productoCarrito.cantidadLote;
    }

    return 1;
  }

  obtenerPrecioPaquete(): number {
    switch (this.paqueteSeleccionado) {
      case 1:
        return this.producto.precioPaquete1;
      case 6:
        return this.producto.precioPaquete6;
      case 12:
        return this.producto.precioPaquete12;
      case 24:
        return this.producto.precioPaquete24;
      default:
        return this.producto.precioPaquete1;
    }
  }

  agregarFavoritos(idReceta: number): void {
    if (this._CompartidoService.obtenerSesion() != null) {
      let favoritoUsuarioAgregar: FavoritoUsuarioAgregarDTO = {
        idReceta: idReceta,
      };

      this._favoritosService
        .agregarFavoritos(
          favoritoUsuarioAgregar,
          this._CompartidoService.obtenerSesion().token,
        )
        .subscribe({
          next: (favoritoUsuarioAgregado: FavoritoUsuario) => {
            this.agregarFavorito.emit(favoritoUsuarioAgregado);
          },
          error: (e) => {
            console.error('Error al agregar favorito:', e);
          },
        });
    } else {
      this._MessageService.add({
        severity: 'info',
        summary: 'Logueo necesario',
        detail:
          'Por favor inicia sesión o registrate antes de agregar favoritos',
      });
      this._Router.navigateByUrl('/cerverica/login');
    }
  }

  eliminarFavoritos(idReceta: number): void {
    let favoritoUsuarioSeleccionado: FavoritoUsuario | undefined =
      this.favoritosUsuario.find((favorito) => favorito.idReceta === idReceta);

    if (favoritoUsuarioSeleccionado) {
      let favoritoUsuarioEliminar: FavoritoUsuarioAgregarDTO = {
        idReceta: favoritoUsuarioSeleccionado.idReceta,
      };

      this._favoritosService
        .eliminarFavoritos(
          favoritoUsuarioEliminar,
          this._CompartidoService.obtenerSesion().token,
        )
        .subscribe({
          next: () => {
            this.eliminarFavorito.emit(idReceta);
          },
          error: (e) => {
            console.error('Error al eliminar favorito:', e);
          },
        });
    } else {
      console.error('Favorito no encontrado:', idReceta);
    }
  }

  agregarCarrito(event: Event): void {
    if (this._CompartidoService.obtenerSesion() != null) {
      if (!this.enviandoProductoACarrito) {
        const button = event.target as HTMLElement;
        button.classList.toggle('clicked');
        button.setAttribute('disabled', 'true');
        this.enviandoProductoACarrito = true;

        button.addEventListener(
          'animationend',
          () => {
            if (this.productoYaEnCarrito()) {
              let productoCarritoActualizar: ActualizarProductoCarritoDTO = {
                idReceta: this.producto.id,
                cantidadLote: this.paqueteSeleccionado,
                cantidad: this.cantidadPaquetes,
              };

              this._CarritoService
                .actualizarProductoCarrito(
                  productoCarritoActualizar,
                  this._CompartidoService.obtenerSesion().token,
                )
                .subscribe({
                  next: (productoCarrito: ProductoCarrito) => {
                    this.actualizarProductoCarrito.emit(productoCarrito);

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
                      console.error(
                        'Error al actualizar producto en el carrito:',
                        e,
                      );

                      this._MessageService.add({
                        severity: 'error',
                        summary: 'Problema al agregar',
                        detail:
                          'Ocurrio un problema al actualizar el producto, intentalo de nuevo',
                      });
                    }
                  },
                  complete: () => {
                    button.classList.remove('clicked');
                    this.enviandoProductoACarrito = false;
                  },
                });
            } else {
              let nuevoProductoCarrito: AgregarProductoCarritoDTO = {
                idReceta: this.producto.id,
                cantidadLote: this.paqueteSeleccionado,
                cantidad: this.cantidadPaquetes,
              };

              this._CarritoService
                .agregarProductoCarrito(
                  nuevoProductoCarrito,
                  this._CompartidoService.obtenerSesion().token,
                )
                .subscribe({
                  next: (productoCarrito: ProductoCarrito) => {
                    this.agregarProductoCarrito.emit(productoCarrito);

                    this._MessageService.add({
                      severity: 'success',
                      summary: 'Producto actualizado',
                      detail: 'Producto correctamente agregado al carrito',
                    });
                  },
                  error: (e) => {
                    console.error('Error al agregar producto al carrito:', e);

                    this._MessageService.add({
                      severity: 'error',
                      summary: 'Problema al agregar',
                      detail:
                        'Ocurrio un problema al intentar agregar el producto, intentalo de nuevo',
                    });
                  },
                  complete: () => {
                    button.classList.remove('clicked');
                    this.enviandoProductoACarrito = false;
                  },
                });
            }
          },
          { once: true },
        );
      }
    } else {
      this._MessageService.add({
        severity: 'info',
        summary: 'Logueo necesario',
        detail:
          'Por favor inicia sesión o registrate antes de agregar al carrito',
      });
      this._Router.navigateByUrl('/cerverica/login');
    }
  }

  aumentarPaquetes() {
    if (this.esCantidadAumentable()) {
      this.cantidadCervezasReceta.cantidadTotalCervezas +=
        this.paqueteSeleccionado;
      this.cantidadPaquetes++;
      this.CantidadElement.nativeElement.innerHTML = this.cantidadPaquetes;
    }
  }

  disminuirPaquetes() {
    if (this.esCantidadDisminuible()) {
      this.cantidadCervezasReceta.cantidadTotalCervezas -=
        this.paqueteSeleccionado;
      console.log('nomas');

      this.cantidadPaquetes--;
      this.CantidadElement.nativeElement.innerHTML = this.cantidadPaquetes;
    }
  }

  esCantidadDisminuible(): boolean {
    return (
      this.cantidadPaquetes != 1 &&
      this.cantidadCervezasReceta.cantidadTotalCervezas -
        this.paqueteSeleccionado <=
        this.producto.cantidadEnStock
    );
  }

  esCantidadAumentable(): boolean {
    return (
      this.cantidadCervezasReceta.cantidadTotalCervezas +
        this.paqueteSeleccionado <=
      this.producto.cantidadEnStock
    );
  }

  actualizarPaqueteSeleccionado(nuevaCantidadSeleccionada: number) {
    this.paqueteSeleccionado = nuevaCantidadSeleccionada;
    this.cantidadPaquetes = this.obtenerCantidadEnCarrito();
    this.precioMostrar = this.obtenerPrecioPaquete();

    if (!this.productoEnCarrito) {
      this.cantidadCervezasReceta.cantidadTotalCervezas =
        this.paqueteSeleccionado;
    }

    this.CantidadElement.nativeElement.innerHTML = this.cantidadPaquetes;
  }

  productoYaEnCarrito(): boolean {
    return this.productosCarrito.some(
      (productoCarrito) =>
        productoCarrito.idReceta === this.producto.id &&
        productoCarrito.cantidadLote === this.paqueteSeleccionado,
    );
  }

  obtenerCantidadEnCarrito(): number {
    const productoCarrito = this.productosCarrito.find(
      (p) =>
        p.idReceta === this.producto.id &&
        p.cantidadLote === this.paqueteSeleccionado,
    );

    this.cantidadPaquetes = productoCarrito ? productoCarrito.cantidad : 1;

    return productoCarrito ? productoCarrito.cantidad : 1;
  }

  esCantidadDisponible(cantidad: number): boolean {
    return this.producto.cantidadEnStock >= cantidad;
  }

  seEncuentraEnProductosCarrito(idReceta: number): boolean {
    const productoEncontrado: any = this.productosCarrito.find(
      (productoCarrito) => productoCarrito.idReceta === idReceta,
    );
    return !!productoEncontrado; // Devuelve true si lo encuentra, false si no.
  }

  obtenerBadge(): string | null {
    return this.producto.cantidadEnStock > 0
      ? this.producto.nuevo
        ? 'new'
        : null
      : 'OutStock';
  }
}
