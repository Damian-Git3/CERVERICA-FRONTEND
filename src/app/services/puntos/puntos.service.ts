import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CompartidoService } from '../compartido/compartido.service';
import { Proveedor } from '../../interfaces/proveedores/proveedor';
import { Observable } from 'rxjs';
import { PuntosFidelidad } from '../../interfaces/puntos-fidelidad/PuntosFidelidad';
import { ReglaPuntos } from '../../interfaces/puntos-fidelidad/ReglaPuntos';

@Injectable({
  providedIn: 'root',
})
export class PuntosService {
  private _baseURL: string = `${environment.APIURL}/PuntosFidelidad`;

  constructor(
    private http: HttpClient,
    private _CompartidoService: CompartidoService
  ) {}

  getPuntosFidelidad(): Observable<PuntosFidelidad> {
    return this.http.get<PuntosFidelidad>(
      `${this._baseURL}/obtener-puntos-fidelidad`
    );
  }

  getReglaPuntos(): Observable<ReglaPuntos> {
    return this.http.get<ReglaPuntos>(`${this._baseURL}/obtener-regla-puntos`);
  }

  registrarPuntosFidelidad(data: any) {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}/registrar-puntos-fidelidad`, data);
  }
}
