import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfiguracionVentasMayoreo } from '../../interfaces/configuracionesVentaMayoreo/ConfiguracionVentasMayoreo';
import { ConfiguracionesGenerales } from '../../interfaces/configuracionesGenerales/ConfiguracionGeneral';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionesService {
  _baseURL: string = `${environment.APIURL}/ConfiguracionVentasMayoreo`;

  constructor(private http: HttpClient) {}

  obtenerConfiguracion(): Observable<ConfiguracionVentasMayoreo> {
    return this.http.get<ConfiguracionVentasMayoreo>(
      `${this._baseURL}/obtener-configuracion`
    );
  }

  obtenerConfiguracionGeneral(): Observable<ConfiguracionesGenerales> {
    return this.http.get<ConfiguracionesGenerales>(
      `${environment.APIURL}/ConfiguracionesGenerales/obtener-configuracion-general`
    );
  }
}
