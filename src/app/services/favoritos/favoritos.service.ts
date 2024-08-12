import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FavoritoUsuarioAgregarDTO } from '../../interfaces/favoritos/favorito-usuario-agregar-dto';
import { FavoritoUsuario } from '../../interfaces/favoritos/favorito-usuario';


@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  _baseURL: string = `${environment.APIURL}/Favoritos`;

  constructor(private http: HttpClient) {}

  agregarFavoritos(favoritoUsuarioAgregar: FavoritoUsuarioAgregarDTO, token: string): Observable<FavoritoUsuario> {
    const headers = { 'Authorization': `Bearer ${token}` }
    return this.http.post<FavoritoUsuario>(
      `${this._baseURL}/agregar-favorito`, favoritoUsuarioAgregar, {headers}
    );
  }

  eliminarFavoritos(favoritoUsuarioEliminar: FavoritoUsuarioAgregarDTO, token: string): Observable<{ message: string }> {
    const headers = { 'Authorization': `Bearer ${token}` }
    return this.http.post<{ message: string }>(
      `${this._baseURL}/eliminar-favorito`,
      favoritoUsuarioEliminar, {headers}
    );
  }

  obtenerFavoritos(token: string): Observable<FavoritoUsuario[]> {
    const headers = { 'Authorization': `Bearer ${token}` }
    return this.http.get<FavoritoUsuario[]>(
      `${this._baseURL}/obtener-favoritos`, {headers}
    );
  }
}
