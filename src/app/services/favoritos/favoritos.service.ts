import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FavoritoUsuario } from '../../interfaces/favorito-usuario';


@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  _baseURL: string = `${environment.APIURL}/Favoritos`;

  constructor(private http: HttpClient) {}

  agregarFavoritos(
    favoritoUsuario: FavoritoUsuario
  ): Observable<FavoritoUsuario> {
    return this.http.post<FavoritoUsuario>(
      `${this._baseURL}/agregar-favorito`,
      favoritoUsuario
    );
  }

  eliminarFavoritos(
    favoritoUsuario: FavoritoUsuario
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this._baseURL}/eliminar-favorito`,
      favoritoUsuario
    );
  }

  obtenerFavoritos(idUsuario: number): Observable<FavoritoUsuario[]> {
    return this.http.get<FavoritoUsuario[]>(
      `${this._baseURL}/obtener-favoritos/${idUsuario}`
    );
  }
}
