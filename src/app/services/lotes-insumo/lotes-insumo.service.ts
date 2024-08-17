import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoteInsumoDTO } from '../../interfaces/lotes-insumo/lote-insumo-dto';
import { CrearLoteInsumoDTO } from '../../interfaces/lotes-insumo/crear-lote-insumo-dto';
import { EditarLoteInsumoDTO } from '../../interfaces/lotes-insumo/editar-lote-insumo-dto';

@Injectable({
  providedIn: 'root',
})
export class LotesInsumoService {
  private _baseURL: string = `${environment.APIURL}/LotesInsumos`;
  private _http = inject(HttpClient);

  obtenerLotesInsumo(): Observable<LoteInsumoDTO[]> {
    return this._http.get<LoteInsumoDTO[]>(this._baseURL);
  }

  obtenerLotesInsumoTodos(): Observable<LoteInsumoDTO[]> {
    return this._http.get<LoteInsumoDTO[]>(`${this._baseURL}/todos`);
  }

  obtenerLotesInsumoVacios(): Observable<LoteInsumoDTO[]> {
    return this._http.get<LoteInsumoDTO[]>(`${this._baseURL}/vacios`);
  }
  obtenerLotesInsumoCaducados(): Observable<LoteInsumoDTO[]> {
    return this._http.get<LoteInsumoDTO[]>(`${this._baseURL}/caducados`);
  }
  LoteInsumo(id: number): Observable<LoteInsumoDTO> {
    return this._http.get<LoteInsumoDTO>(`${this._baseURL}/${id}`);
  }
  obtenerLoteInsumoPorInsumo(idInsumo: number): Observable<LoteInsumoDTO[]> {
    return this._http.get<LoteInsumoDTO[]>(
      `${this._baseURL}/insumo/${idInsumo}`
    );
  }

  obtenerLoteInsumoPorFecha(
    fecha1: Date,
    fecha2: Date
  ): Observable<LoteInsumoDTO[]> {
    let params = new HttpParams()
      .set('fecha1', fecha1.toISOString())
      .set('fecha2', fecha2.toISOString());

    return this._http.get<LoteInsumoDTO[]>(`${this._baseURL}/fechaCompra`, {
      params,
    });
  }
  crearLoteInsumo(
    loteInsumo: CrearLoteInsumoDTO
  ): Observable<{ message: string; id: number }> {
    return this._http.post<{ message: string; id: number }>(
      this._baseURL,
      loteInsumo
    );
  }
  editarLoteInsumo(
    id: number,
    loteInsumo: EditarLoteInsumoDTO
  ): Observable<{ message: string }> {
    return this._http.put<{ message: string }>(
      `${this._baseURL}/${id}`,
      loteInsumo
    );
  }

  editarMermaLoteInsumo(
    id: number,
    merma: number
  ): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(
      `${this._baseURL}/merma/${id}?merma=${merma}`,
      {}
    );
  }

  eliminarLoteInsumo(id: number): Observable<any> {
    return this._http.delete(`${this._baseURL}/${id}`);
  }
}
