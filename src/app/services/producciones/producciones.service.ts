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

  asignarOperador(id: number, idUsuario: string): Observable<any> {
    return this.http.put(`${this._baseURL}/asignar-usuario/${id}`, {
      idUsuario,
    });
  }

  aceptarSolicutud(idSolicitud: number): Observable<any> {
    return this.http.get(
      `${this._baseURL}/aceptar-solicitud/${idSolicitud}`,
      {}
    );
  }

  rechazarSolicitud(idSolicitud: number, mensaje: string): Observable<any> {
    let formData = new FormData();
    formData.append('mensaje', mensaje);
    return this.http.post(
      `${this._baseURL}/rechazar-solicitud/${idSolicitud}`,
      formData
    );
  }

  posponerSolicitud(idSolicitud: number, mensaje: string): Observable<any> {
    let formData = new FormData();
    formData.append('mensaje', mensaje);
    return this.http.post(
      `${this._baseURL}/posponer-solicitud/${idSolicitud}`,
      formData
    );
  }

  avanzarPaso(data: any): Observable<any> {
    return this.http.post(`${this._baseURL}/avanzar-paso`, data);
  }
}
