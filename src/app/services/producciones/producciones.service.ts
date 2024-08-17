import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProduccionesService {
  private _baseURL: string = `${environment.APIURL}/Produccion`;

  constructor(private http: HttpClient) {}

  obtener(): Observable<any> {
    return this.http.get(`${this._baseURL}`);
  }

  crear(data: any): Observable<any> {
    return this.http.post(`${this._baseURL}`, data);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get(`${this._baseURL}/${id}`);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this._baseURL}/${id}`);
  }

  resolicitar(id: number): Observable<any> {
    return this.http.post(`${this._baseURL}/resolicitar/${id}`, {});
  }

  almacenar(id: number, data: any): Observable<any> {
    return this.http.post(`${this._baseURL}/almacenar/${id}`, data);
  }

  asignarOperador(id: number, idUsuario: number): Observable<any> {
    return this.http.put(`${this._baseURL}/${id}/asignar-usuario`, {
      idUsuario,
    });
  }

  aceptarSolicutud(idSolicitud: number): Observable<any> {
    return this.http.post(
      `${this._baseURL}/aceptar-solicitud/${idSolicitud}`,
      {}
    );
  }

  rechazarSolicitud(idSolicitud: number): Observable<any> {
    return this.http.post(
      `${this._baseURL}/rechazar-solicitud/${idSolicitud}`,
      {}
    );
  }

  posponerSolicitud(idSolicitud: number): Observable<any> {
    return this.http.post(
      `${this._baseURL}/posponer-solicitud/${idSolicitud}`,
      {}
    );
  }

  avanzarPaso(data: any): Observable<any> {
    return this.http.post(`${this._baseURL}/avanzar-paso`, data);
  }
}
