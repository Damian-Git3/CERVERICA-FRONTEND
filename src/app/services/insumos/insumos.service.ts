import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsumosService {
  private _baseURL: string = `${environment.APIURL}/Insumos`;

  constructor(private http: HttpClient) { }

  // Add the following methods
  // This method will get all the insumos from the database

  obtener(): Observable<any> {
    return this.http.get(`${this._baseURL}`);
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

  activar(id: number): Observable<any> {
    return this.http.post(`${this._baseURL}/activar?${id}`, {});
  }

  desactivar(id: number): Observable<any> {
    return this.http.post(`${this._baseURL}/desactivar?${id}`, {});
  }
}
