import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../interfaces/productos/producto';
import { FavoritosService } from '../../../services/favoritos.service';
import { FavoritoUsuario } from '../../../interfaces/favorito-usuario';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() producto!: Producto;
  @Input() favoritosUsuario!: FavoritoUsuario[];
  @Output() agregarFavorito = new EventEmitter<FavoritoUsuario>();
  @Output() eliminarFavorito = new EventEmitter<number>();
  @Output() actualizarProductos = new EventEmitter<void>();
  cantidadSeleccionada: number = 1;

  constructor(private _favoritosService: FavoritosService) {}

  agregarFavoritos(idProducto: number): void {
    let favoritoUsuario: FavoritoUsuario = {
      id: 0,
      idUsuario: 1,
      idProducto: idProducto,
    };

    this._favoritosService.agregarFavoritos(favoritoUsuario).subscribe({
      next: (favoritoUsuarioAgregado: FavoritoUsuario) => {
        this.agregarFavorito.emit(favoritoUsuarioAgregado);
      },
      error: (e) => {
        console.error('Error al agregar favorito:', e);
      },
    });
  }

  eliminarFavoritos(idUsuario: number, idProducto: number): void {
    let favoritoUsuarioSeleccionado: FavoritoUsuario | undefined =
      this.favoritosUsuario.find(
        (favorito) => favorito.idProducto === idProducto
      );

    if (favoritoUsuarioSeleccionado) {
      let favoritoUsuario: FavoritoUsuario = {
        id: favoritoUsuarioSeleccionado.id,
        idUsuario: favoritoUsuarioSeleccionado.idUsuario,
        idProducto: favoritoUsuarioSeleccionado.idProducto,
      };

      this._favoritosService.eliminarFavoritos(favoritoUsuario).subscribe({
        next: () => {
          this.eliminarFavorito.emit(idProducto);
        },
        error: (e) => {
          console.error('Error al eliminar favorito:', e);
        },
      });
    } else {
      console.error('Favorito no encontrado:', idProducto);
    }
  }

  agregarCarrito(event: Event, idProducto: number): void {
    const button = event.target as HTMLElement;
    button.classList.toggle('clicked');
  }

  actualizarCantidadSeleccionada(nuevaCantidadSeleccionada: number) {
    console.log(nuevaCantidadSeleccionada);

    this.cantidadSeleccionada = nuevaCantidadSeleccionada;
  }
}
