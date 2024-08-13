import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginDTO } from '../../interfaces/usuario/login-dto';
import { RegistrarDTO } from '../../interfaces/usuario/registrar-dto';
import { SesionDTO } from '../../interfaces/usuario/sesion-dto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  _baseURL: string = `${environment.APIURL}/Account`;

  constructor(private http: HttpClient) {}

  registrarCuenta(request: RegistrarDTO): Observable<SesionDTO> {
    return this.http.post<SesionDTO>(`${this._baseURL}/register`, request);
  }

  iniciarSesion(request: LoginDTO): Observable<SesionDTO> {
    return this.http.post<SesionDTO>(`${this._baseURL}/login`, request);
  }

  cerrarSesion(): Observable<any> {
    return this.http.post<any>(`${this._baseURL}/logout`, null);
  }

  activar(id: number): Observable<any> {
    return this.http.get<any>(`${this._baseURL}/activar/${id}`);
  }

  desactivar(id: number): Observable<any> {
    return this.http.get<any>(`${this._baseURL}/desactivar/${id}`);
  }

  renovarToken(data: any): Observable<SesionDTO> {
    return this.http.post<SesionDTO>(`${this._baseURL}/refresh-token`, data);
  }

  recuperarContrasena(email: string): Observable<any> {
    return this.http.post<any>(`${this._baseURL}/forgot-password`, { email });
  }

  resetearContrasena(data: any): Observable<any> {
    return this.http.post<any>(`${this._baseURL}/reset-password`, data);
  }

  cambiarContrasena(data: any): Observable<any> {
    return this.http.post<any>(`${this._baseURL}/change-password`, data);
  }

  obtenerPerfil(): Observable<any> {
    return this.http.get<any>(`${this._baseURL}/detail`);
  }

  obtenerUsuarios(): Observable<any> {
    return this.http.get<any>(`${this._baseURL}`);
  }
}
