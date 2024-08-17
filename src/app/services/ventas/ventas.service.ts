import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrearVentaDTO } from '../../interfaces/ventas/crear-venta-dto';
import { Observable } from 'rxjs';
import { VentaDTO } from '../../interfaces/ventas/venta-dto';
import { environment } from '../../../environments/environment.development';
import { PedidoDTO } from '../../interfaces/ventas/pedido-dto';
import { Venta } from '../../interfaces/ventas/venta';

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

  obtenerPedidosUsuario(): Observable<PedidoDTO[]> {
    return this._HttpClient.get<PedidoDTO[]>(
      `${this._baseURL}/pedidos-usuario`
    );
  }

  obtenerPedido(idPedido: number): Observable<Venta> {
    return this._HttpClient.get<Venta>(`${this._baseURL}/pedidos/${idPedido}`);
  }

  obtenerVentas(): Observable<Venta[]> {
    return this._HttpClient.get<Venta[]>(`${this._baseURL}`);
  }

  siguienteEstatus(idPedido: number): Observable<any> {
    const url = `${this._baseURL}/siguiente-estatus/${idPedido}`;
    return this._HttpClient.get<any>(url);
  }

  siguienteEstatusLanding(idPedido: number): Observable<any> {
    const url = `${this._baseURL}/siguiente-estatus-landing/${idPedido}`;
    return this._HttpClient.get<any>(url);
  }

  // Método para retroceder al estatus anterior
  anteriorEstatus(idPedido: number): Observable<any> {
    const url = `${this._baseURL}/anterior-estatus/${idPedido}`;
    return this._HttpClient.get<any>(url);
  }
}
