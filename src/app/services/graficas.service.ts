import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraficasService {
  _baseURL: string = `${environment.APIURL}/Graficas`;

  _HttpClient = inject(HttpClient);

  getNuevosClientesPorMes(): Observable<any> {
    return this._HttpClient.get<any>(
      `${this._baseURL}/nuevos-clientes-por-mes`
    );
  }

  getVentasPorEstatus(): Observable<any> {
    return this._HttpClient.get<any>(`${this._baseURL}/ventas-por-estatus`);
  }

  getIngresosPorMes(): Observable<any> {
    return this._HttpClient.get<any>(`${this._baseURL}/ingresos-por-mes`);
  }

  getProductosMasVendidos(): Observable<any> {
    return this._HttpClient.get<any>(`${this._baseURL}/productos-mas-vendidos`);
  }

  getPedidosPorMetodoPago(): Observable<any> {
    return this._HttpClient.get<any>(
      `${this._baseURL}/pedidos-por-metodo-pago`
    );
  }
}
