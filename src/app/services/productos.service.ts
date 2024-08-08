import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/productos/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  _baseURL: string = `${environment.APIURL}/Receta`;

  constructor(private http: HttpClient) {}

  obtenerProductosCarousel(): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this._baseURL}/obtener-recetas-carousel`
    );
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this._baseURL}/obtener-recetas-landing`);
  }
}
