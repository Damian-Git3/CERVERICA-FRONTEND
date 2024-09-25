import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CompartidoService } from '../compartido/compartido.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private _baseURL: string = `${environment.APIURL}/Roles`;

  constructor(
    private http: HttpClient,
    private _CompartidoService: CompartidoService,
  ) {}

  crear(roleName: string): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this._baseURL}`, roleName, { headers });
  }

  obtener(): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this._baseURL}`, { headers });
  }

  eliminar(id: number): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(`${this._baseURL}/${id}`, { headers });
  }

  asignar(roleId: number, userId: number): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(
      `${this._baseURL}/assing`,
      { roleId, userId },
      { headers },
    );
  }

  obtenerRolesUsuarios(): Observable<any> {
    const token = this._CompartidoService.obtenerSesion().token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this._baseURL}/users`, { headers });
  }
}
