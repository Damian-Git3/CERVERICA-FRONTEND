import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompartidoService } from '../compartido/compartido.service';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private _baseURL: string = `${environment.APIURL}/Receta`;

  constructor(
    private http: HttpClient,
    private _CompartidoService: CompartidoService
  ) {}

  obtener(): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this._baseURL}`, { headers });
  }

  crear(data: any): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}`, data, { headers });
  }

  obtenerPorId(id: number): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this._baseURL}/${id}`, { headers });
  }

  modificar(id: number, data: any): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put(`${this._baseURL}/${id}`, data, { headers });
  }

  eliminar(id: number): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(`${this._baseURL}/${id}`, { headers });
  }

  crearPasos(id: number, data: any): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}/${id}/pasos`, data, { headers });
  }

  obtenerPasos(id: number): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this._baseURL}/${id}/pasos`, { headers });
  }

  modificarPasos(id: number, data: any): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put(`${this._baseURL}/${id}/pasos`, data, { headers });
  }

  activar(id: number): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}/activar/${id}`, {}, { headers });
  }

  desactivar(id: number): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}/desactivar/${id}`, {}, { headers });
  }

  actualizarPrecios(id: number, data: any): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}/${id}/ActualizarPrecios`, data, {
      headers,
    });
  }

  obtenerRecetasConStock(id: number): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this._baseURL}/${id}/ConStock`, { headers });
  }
}
