import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioDTO } from '../../interfaces/comentario/comentario-dto';
import { NuevoComentarioDTO } from '../../interfaces/comentario/nuevo-comentario-dto';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  _baseURL: string = `${environment.APIURL}/Comentarios`;

  _Http: HttpClient = inject(HttpClient);

  // Método para obtener todos los comentarios de un producto
  obtenerComentarios(idProducto: number): Observable<ComentarioDTO[]> {
    return this._Http.get<ComentarioDTO[]>(
      `${this._baseURL}/obtener-comentarios/${idProducto}`
    );
  }

  // Método para agregar un nuevo comentario
  agregarComentario(nuevoComentario: NuevoComentarioDTO): Observable<any> {
    return this._Http.post(
      `${this._baseURL}/agregar.comentario`,
      nuevoComentario
    );
  }
}
