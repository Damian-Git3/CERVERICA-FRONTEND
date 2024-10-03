import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UsuarioDTO } from '../../interfaces/usuarios/usuario-dto';
import { CrearUsuarioDTO } from '../../interfaces/usuarios/crear-usuario-dto';
import { EditarUsuarioDTO } from '../../interfaces/usuarios/editar-usuario-dto';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private _baseURL: string = `${environment.APIURL}/Usuarios`;

  constructor(private _Http: HttpClient) {}

  obtenerUsuarios(): Observable<UsuarioDTO[]> {
    return this._Http.get<UsuarioDTO[]>(`${this._baseURL}`);
  }

  agregarUsuario(nuevoUsuario: CrearUsuarioDTO): Observable<UsuarioDTO> {
    return this._Http.post<UsuarioDTO>(
      `${this._baseURL}/agregar`,
      nuevoUsuario,
    );
  }

  editarUsuario(
    id: string,
    usuarioEditado: EditarUsuarioDTO,
  ): Observable<void> {
    return this._Http.put<void>(
      `${this._baseURL}/editar/${id}`,
      usuarioEditado,
    );
  }

  eliminarUsuario(id: string): Observable<string> {
    return this._Http.delete<string>(`${this._baseURL}/eliminar/${id}`);
  }

  activarUsuario(id: string): Observable<void> {
    return this._Http.put<void>(`${this._baseURL}/activar/${id}`, {});
  }

  desactivarUsuario(id: string): Observable<void> {
    return this._Http.put<void>(`${this._baseURL}/desactivar/${id}`, {});
  }
}
