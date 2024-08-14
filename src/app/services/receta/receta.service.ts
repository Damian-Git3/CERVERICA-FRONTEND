import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private _baseURL: string = `${environment.APIURL}/Receta`;

  constructor(private http: HttpClient) {}

  obtener(token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this._baseURL}`, { headers });
  }

  crear(data: any): Observable<any> {
    return this.http.post(`${this._baseURL}`, data);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get(`${this._baseURL}/${id}`);
  }

  modificar(id: number, data: any): Observable<any> {
    return this.http.put(`${this._baseURL}/${id}`, data);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this._baseURL}/${id}`);
  }

  crearPasos(id: number, data: any): Observable<any> {
    return this.http.post(`${this._baseURL}/${id}/pasos`, data);
  }

  activar(id: number): Observable<any> {
    return this.http.post(`${this._baseURL}/activar/${id}`, {});
  }

  desactivar(id: number): Observable<any> {
    return this.http.post(`${this._baseURL}/desactivar/${id}`, {});
  }

  actualizarPrecios(id: number, data: any): Observable<any> {
    return this.http.post(`${this._baseURL}/${id}/ActualizarPrecios`, data);
  }

  obtenerRecetasConStock(id: number): Observable<any> {
    return this.http.get(`${this._baseURL}/${id}/ConStock`);
  }
}
