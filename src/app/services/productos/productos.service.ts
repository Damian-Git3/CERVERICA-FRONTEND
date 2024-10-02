import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Producto } from '../../interfaces/productos/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  _baseURL: string = `${environment.APIURL}/Receta`;

  constructor(private http: HttpClient) {}

  obtenerProductosCarousel(): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this._baseURL}/obtener-recetas-carousel`,
    );
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this._baseURL}/obtener-recetas-landing`,
    );
  }

  obtenerProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this._baseURL}/${id}`);
  }
}
