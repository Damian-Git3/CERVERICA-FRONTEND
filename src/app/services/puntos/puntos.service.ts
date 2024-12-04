import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CompartidoService } from '../compartido/compartido.service';
import { Proveedor } from '../../interfaces/proveedores/proveedor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {
  private _baseURL: string = `${environment.APIURL}/PuntosFidelidad`;

  constructor(
    private http: HttpClient,
    private _CompartidoService: CompartidoService,
  ) {}

  getPuntosFidelidad() {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this._baseURL}/obtener-puntos-fidelidad`, { headers });
  }

  registrarPuntosFidelidad(data: any) {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}/registrar-puntos-fidelidad`, data, { headers });
  }

}
