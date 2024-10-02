import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Producto } from '../../../interfaces/productos/producto';
import { FavoritosService } from '../../../services/favoritos/favoritos.service';
import { ProductosService } from '../../../services/productos/productos.service';
import { CompartidoService } from '../../../services/compartido/compartido.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CarritoService } from '../../../services/carrito/carrito.service';
import { ProductoCarrito } from '../../../interfaces/carrito/producto-carrito';
import { FavoritoUsuario } from '../../../interfaces/favoritos/favorito-usuario';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  @Output() actualizarCarrito = new EventEmitter<ProductoCarrito>();
  productosOriginales: Producto[] = [];
  productosCarrito: ProductoCarrito[] = [];
  productos: Producto[] = [];
  filtros: { label: string; value: string }[] = [
    { label: 'Todos', value: 'todo' },
    { label: 'Lo más nuevo', value: 'nuevo' },
    { label: 'Por precio (menor a mayor)', value: 'precioAsc' },
    { label: 'Por precio (mayor a menor)', value: 'precioDesc' },
    { label: 'Ordenar de la A-Z', value: 'az' },
    { label: 'Ordenar de la Z-A', value: 'za' },
  ];
  filtroSeleccionado: { label: string; value: string } | undefined;
  filtroBusqueda: string = '';
  mostrandoFavoritos: boolean = false;
  favoritosUsuario: FavoritoUsuario[] = [];

  _CompartidoService = inject(CompartidoService);
  _AuthService = inject(AuthService);
  _CarritoService = inject(CarritoService);

  obteniendoProductos: boolean = false;

  constructor(
    private _productosService: ProductosService,
    private _favoritosService: FavoritosService,
  ) {}

  actualizarProductos(): void {
    const favoritosSet = new Set(
      this.favoritosUsuario.map((favorito) => favorito.idReceta),
    );

    this.productosOriginales.forEach((producto) => {
      producto.favorito = favoritosSet.has(producto.id);

      if (this.esReciente(producto.fecha_registrado)) {
        producto.nuevo = true;
      }
    });

    this.productos = this.productosOriginales;

    if (this.mostrandoFavoritos) {
      this.productos = this.productos.filter((producto) =>
        favoritosSet.has(producto.id),
      );
    }

    if (this.filtroSeleccionado != undefined) {
      switch (this.filtroSeleccionado.value) {
        case 'nuevo':
          this.productos = this.productos.filter((producto) => producto.nuevo);
          break;

        case 'precioAsc':
          this.productos = this.productos.sort(
            (a, b) => a.precioPaquete1 - b.precioPaquete1,
          );
          break;

        case 'precioDesc':
          this.productos = this.productos.sort(
            (a, b) => b.precioPaquete1 - a.precioPaquete1,
          );
          break;

        case 'az':
          this.productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;

        case 'za':
          this.productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
          break;

        default:
          this.filtroSeleccionado = undefined;
          break;
      }
    }

    if (this.filtroBusqueda != '') {
      this.productos = this.productos.filter((producto) =>
        producto.nombre
          .toLowerCase()
          .includes(this.filtroBusqueda.toLowerCase()),
      );
    }
  }

  agregarFavorito(favoritoAgregar: FavoritoUsuario): void {
    this.favoritosUsuario.push(favoritoAgregar);
    this.actualizarProductos();
  }

  agregarProductoCarrito(productoCarrito: ProductoCarrito): void {
    this._CarritoService.agregarListaProductosCarrito(productoCarrito);
  }

  actualizarProductoCarrito(productoCarrito: ProductoCarrito): void {
    this._CarritoService.actualizarListaProductosCarrito(productoCarrito);
  }

  eliminarFavorito(idRecetaEliminar: number): void {
    this.favoritosUsuario = this.favoritosUsuario.filter(
      (favorito) => favorito.idReceta !== idRecetaEliminar,
    );
    this.actualizarProductos();
  }

  mostrarFavoritos(): void {
    this.mostrandoFavoritos = !this.mostrandoFavoritos;

    this.actualizarProductos();
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this._CarritoService.ProductosCarrito.subscribe((productosCarrito) => {
      this.productosCarrito = productosCarrito;
    });
  }

  obtenerProductos() {
    this.obteniendoProductos = true;

    this._productosService.obtenerProductos().subscribe({
      next: (productosResponse) => {
        this.productos = productosResponse;
        this.productosOriginales = productosResponse;

        if (this._CompartidoService.obtenerSesion() != null) {
          this.obtenerFavoritosUsuario();
        }

        this.obteniendoProductos = false;
      },
      error: (e) => {
        console.log(e);

        this.obteniendoProductos = false;
      },
    });
  }

  obtenerFavoritosUsuario() {
    this._favoritosService
      .obtenerFavoritos(this._CompartidoService.obtenerSesion().token)
      .subscribe({
        next: (favoritosUsuario: FavoritoUsuario[]) => {
          this.favoritosUsuario = favoritosUsuario;

          this.actualizarProductos();
        },
        error: (e) => {
          if ((e.status = 401)) {
            this._CompartidoService.tokenExpirado();
          } else {
            console.log(e);
          }
        },
      });
  }

  private esReciente(fecha: string): boolean {
    const fechaProducto = new Date(fecha);
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 7);
    return fechaProducto > fechaLimite;
  }
}
