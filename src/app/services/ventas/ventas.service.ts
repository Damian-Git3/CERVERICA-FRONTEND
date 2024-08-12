import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CrearVentaDTO } from '../../interfaces/ventas/crear-venta-dto';
import { Observable } from 'rxjs';
import { VentaDTO } from '../../interfaces/ventas/venta-dto';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  _baseURL: string = `${environment.APIURL}/Ventas`;

  _HttpClient = inject(HttpClient);

  constructor() {}

  crearVenta(nuevaVenta: CrearVentaDTO, token: string): Observable<VentaDTO> {
    const headers = { Authorization: `Bearer ${token}` };
    return this._HttpClient.post<VentaDTO>(
      `${this._baseURL}/CrearVenta`,
      nuevaVenta,
      { headers }
    );
  }
}
