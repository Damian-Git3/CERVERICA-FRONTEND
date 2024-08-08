import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../interfaces/usuario/login-dto';
import { SesionDTO } from '../interfaces/usuario/sesion-dto';
import { environment } from '../../environments/environment.development';
import { RegistrarDTO } from '../interfaces/usuario/registrar-dto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  _baseURL: string = `${environment.APIURL}/Account`;

  constructor(private http: HttpClient) {}

  iniciarSesion(request: LoginDTO): Observable<SesionDTO> {
    return this.http.post<SesionDTO>(`${this._baseURL}/login`, request);
  }

  registrarCuenta(request: RegistrarDTO): Observable<SesionDTO> {
    return this.http.post<SesionDTO>(`${this._baseURL}/register`, request);
  }
}
