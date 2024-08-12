import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginDTO } from '../../interfaces/usuario/login-dto';
import { RegistrarDTO } from '../../interfaces/usuario/registrar-dto';
import { SesionDTO } from '../../interfaces/usuario/sesion-dto';
import { CarritoService } from '../carrito/carrito.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  _baseURL: string = `${environment.APIURL}/Account`;
  _CarritoService = inject(CarritoService);

  constructor(private http: HttpClient) {}

  iniciarSesion(request: LoginDTO): Observable<SesionDTO> {
    return this.http.post<SesionDTO>(`${this._baseURL}/login`, request);
  }

  registrarCuenta(request: RegistrarDTO): Observable<SesionDTO> {
    return this.http.post<SesionDTO>(`${this._baseURL}/register`, request);
  }

  cerrarSesion(token: string): Observable<SesionDTO> {
    this._CarritoService.vaciarProductosCarrito();

    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<SesionDTO>(
      `${this._baseURL}/logout`,
      {},
      { headers }
    );
  }

  obtenerDetallesCuenta(token: string): Observable<SesionDTO> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<SesionDTO>(`${this._baseURL}/detail`, { headers });
  }
}
