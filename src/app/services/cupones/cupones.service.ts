import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cupon } from '../../interfaces/cupones/Cupon';

@Injectable({
  providedIn: 'root'
})
export class CuponService {
  private baseUrl = `${environment.APIURL}/Cupon`;

  constructor(private http: HttpClient) { }

  registrarCupon(cupon: Cupon): Observable<Cupon> {
    return this.http.post<Cupon>(`${this.baseUrl}/registrar-cupon`, cupon);
  }

  actualizarCupon(id: number, cupon: Cupon): Observable<Cupon> {
    return this.http.put<Cupon>(`${this.baseUrl}/actualizar-cupon/${id}`, cupon);
  }

  obtenerCupon(id: number): Observable<Cupon> {
    return this.http.get<Cupon>(`${this.baseUrl}/obtener-cupon/${id}`);
  }

  obtenerTodosLosCupones(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(`${this.baseUrl}/obtener-todos-los-cupones`);
  }

  buscarCupon(codigo: string): Observable<Cupon> {
    return this.http.get<Cupon>(`${this.baseUrl}/buscar-cupon`, {
      params: { textoCupon: codigo }
    });
  }
}