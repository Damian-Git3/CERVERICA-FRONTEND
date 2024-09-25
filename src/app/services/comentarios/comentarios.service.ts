import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  _baseURL: string = `${environment.APIURL}/Comentarios`;

  _Http : HttpClient =  inject(HttpClient)

  // Método para obtener todos los comentarios de un producto
  obtenerComentarios(idProducto: number): Observable<Comentario[]> {
    return this._Http.get<Comentario]>(`${this._baseURL}/producto/${idProducto}`);
  }

  // Método para agregar un nuevo comentario
  agregarComentario(comentario: ComentarioDTO): Observable<any> {
    return this._Http.post(`${this._baseURL}`, comentario);
  }
}
