import { Component } from '@angular/core';
import { Producto } from '../../interfaces/productos/producto';
import { ProductosService } from '../../services/productos.service';
import { FavoritoUsuario } from '../../interfaces/favorito-usuario';
import { finalize } from 'rxjs/operators';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  productosOriginales: Producto[] = [];
  productos: Producto[] = [];
  filtros: any[] = [
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

  constructor(
    private _productosService: ProductosService,
    private _favoritosService: FavoritosService
  ) {}

  actualizarProductos(): void {
    const favoritosSet = new Set(
      this.favoritosUsuario.map((favorito) => favorito.idProducto)
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
        favoritosSet.has(producto.id)
      );
    }

    if (this.filtroSeleccionado != undefined) {
      switch (this.filtroSeleccionado.value) {
        case 'nuevo':
          this.productos = this.productos.filter((producto) => producto.nuevo);
          break;

        case 'precioAsc':
          this.productos = this.productos.sort((a, b) => a.precioPaquete1 - b.precioPaquete1);
          break;

        case 'precioDesc':
          this.productos = this.productos.sort((a, b) => b.precioPaquete1 - a.precioPaquete1);
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
          .includes(this.filtroBusqueda.toLowerCase())
      );
    }
  }

  agregarFavorito(favoritoAgregar: FavoritoUsuario): void {
    this.favoritosUsuario.push(favoritoAgregar);
    this.actualizarProductos();
  }

  eliminarFavorito(idProductoEliminar: number): void {
    this.favoritosUsuario = this.favoritosUsuario.filter(
      (favorito) => favorito.idProducto !== idProductoEliminar
    );
    this.actualizarProductos();
  }

  mostrarFavoritos(): void {
    this.mostrandoFavoritos = !this.mostrandoFavoritos;

    this.actualizarProductos();
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productosService.obtenerProductos().subscribe({
      next: (productosResponse) => {
        this.productos = productosResponse;
        this.productosOriginales = productosResponse;

        this.obtenerFavoritosUsuario(1);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  obtenerFavoritosUsuario(idUsuario: number) {
    this._favoritosService.obtenerFavoritos(idUsuario).subscribe({
      next: (favoritosUsuario: FavoritoUsuario[]) => {
        this.favoritosUsuario = favoritosUsuario;

        this.actualizarProductos();
      },
      error: (e) => {
        console.log(e);
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
