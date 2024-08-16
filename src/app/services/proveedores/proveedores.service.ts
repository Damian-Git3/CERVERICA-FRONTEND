import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CompartidoService } from '../compartido/compartido.service';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  private _baseURL: string = `${environment.APIURL}/Proveedores`;

  constructor(private http: HttpClient, private _CompartidoService: CompartidoService) { }

  obtener() {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this._baseURL}`, { headers });
  }

  crear(data: any) {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}`, data, { headers });
  }

  obtenerPorId(id: number) {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this._baseURL}/${id}`, { headers });
  }

  modificar(id: number, data: any) {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put(`${this._baseURL}/${id}`, data, { headers });
  }

  eliminar(id: number) {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(`${this._baseURL}/${id}`, { headers });
  }

  activar(id: number) {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}/activar/${id}`, {}, { headers });
  }

  desactivar(id: number) {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}/desactivar/${id}`, {}, { headers });
  }


}
