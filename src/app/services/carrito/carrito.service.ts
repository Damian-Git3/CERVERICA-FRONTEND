import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductoCarrito } from '../../interfaces/carrito/producto-carrito';
import { AgregarProductoCarritoDTO } from '../../interfaces/carrito/agregar-producto-carrito-dto';
import { ActualizarProductoCarritoDTO } from '../../interfaces/carrito/actualizar-producto-carrito-dto';
import { EliminarProductoCarritoDTO } from '../../interfaces/carrito/eliminar-producto-carrito-dto';
import { CantidadCervezasReceta } from '../../interfaces/carrito/cantidad-cervezas-receta';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  _baseURL: string = `${environment.APIURL}/Carrito`;

  _HttpClient = inject(HttpClient);

  private productosCarrito: ProductoCarrito[] = [];
  private _ProductosCarrito: BehaviorSubject<ProductoCarrito[]> =
    new BehaviorSubject<ProductoCarrito[]>([]);

  private cantidadTotalCervezasEnCarritoPorReceta: CantidadCervezasReceta[] =
    [];
  private _CantidadTotalCervezasEnCarritoPorReceta: BehaviorSubject<
    CantidadCervezasReceta[]
  > = new BehaviorSubject<CantidadCervezasReceta[]>([]);

  get ProductosCarrito() {
    return this._ProductosCarrito.asObservable();
  }

  get CantidadTotalCervezasEnCarritoPorReceta() {
    return this._CantidadTotalCervezasEnCarritoPorReceta.asObservable();
  }

  asignarListaCantidadTotalCervezasCarrito(
    nuevaLista: CantidadCervezasReceta[]
  ) {
    this.cantidadTotalCervezasEnCarritoPorReceta = nuevaLista;
    this._CantidadTotalCervezasEnCarritoPorReceta.next(
      this.cantidadTotalCervezasEnCarritoPorReceta
    );
  }

  actualizarCantidadTotalCervezasCarrito(
    cantidadCervezasReceta: CantidadCervezasReceta
  ) {
    const index = this.cantidadTotalCervezasEnCarritoPorReceta.findIndex(
      (c) => c.idReceta === cantidadCervezasReceta.idReceta
    );

    if (index !== -1) {
      this.cantidadTotalCervezasEnCarritoPorReceta[index] =
        cantidadCervezasReceta;
    }

    this._CantidadTotalCervezasEnCarritoPorReceta.next(
      this.cantidadTotalCervezasEnCarritoPorReceta
    );
  }

  obtenerCantidadCervezasCarrito(idReceta: number) {
    return this.cantidadTotalCervezasEnCarritoPorReceta.find(
      (c) => c.idReceta === idReceta
    );
  }

  agregarProductoCarrito(
    productoCarritoAgregar: AgregarProductoCarritoDTO,
    token: string
  ): Observable<ProductoCarrito> {
    const headers = { Authorization: `Bearer ${token}` };
    return this._HttpClient.post<ProductoCarrito>(
      `${this._baseURL}/agregar-producto-carrito`,
      productoCarritoAgregar,
      { headers }
    );
  }

  actualizarProductoCarrito(
    productoCarritoActualizar: ActualizarProductoCarritoDTO,
    token: string
  ): Observable<ProductoCarrito> {
    const headers = { Authorization: `Bearer ${token}` };
    return this._HttpClient.post<ProductoCarrito>(
      `${this._baseURL}/actualizar-producto-carrito`,
      productoCarritoActualizar,
      { headers }
    );
  }

  eliminarProductoCarrito(
    productoCarritoEliminar: EliminarProductoCarritoDTO,
    token: string
  ): Observable<{ message: string }> {
    const headers = { Authorization: `Bearer ${token}` };
    return this._HttpClient.post<{ message: string }>(
      `${this._baseURL}/eliminar-producto-carrito`,
      productoCarritoEliminar,
      { headers }
    );
  }

  obtenerProductosCarrito(token: string): Observable<ProductoCarrito[]> {
    const headers = { Authorization: `Bearer ${token}` };
    return this._HttpClient.get<ProductoCarrito[]>(
      `${this._baseURL}/obtener-productos-carrito`,
      { headers }
    );
  }

  agregarListaProductosCarrito(productoCarrito: ProductoCarrito) {
    this.productosCarrito.push(productoCarrito);
    this._ProductosCarrito.next(this.productosCarrito);
  }

  eliminarListaProductosCarrito(productoCarrito: ProductoCarrito) {
    const index = this.productosCarrito.findIndex(
      (p) => p.id === productoCarrito.id
    );

    if (index !== -1) {
      this.productosCarrito.splice(index, 1);
    }

    this._ProductosCarrito.next(this.productosCarrito);
  }

  actualizarListaProductosCarrito(productoCarrito: ProductoCarrito) {
    const index = this.productosCarrito.findIndex(
      (p) => p.id === productoCarrito.id
    );

    if (index !== -1) {
      this.productosCarrito[index] = productoCarrito;
    }

    this._ProductosCarrito.next(this.productosCarrito);
  }

  asignarListaProductosCarrito(productosCarrito: ProductoCarrito[]) {
    this.productosCarrito = productosCarrito;
    this._ProductosCarrito.next(this.productosCarrito);
  }

  vaciarProductosCarrito() {
    this.productosCarrito = [];
    this._ProductosCarrito.next(this.productosCarrito);
  }
}
