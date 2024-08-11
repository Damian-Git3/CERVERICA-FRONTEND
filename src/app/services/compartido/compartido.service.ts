import { Injectable } from '@angular/core';
import { SesionDTO } from '../../interfaces/usuario/sesion-dto';

@Injectable({
  providedIn: 'root',
})
export class CompartidoService {
  constructor() {}

  guardarSesion(sesion: SesionDTO) {
    localStorage.setItem('usuarioSesion', JSON.stringify(sesion));
  }

  obtenerSesion() {
    return JSON.parse(localStorage.getItem('usuarioSesion')!);
  }

  eliminarSesion() {
    localStorage.removeItem('usuarioSesion');
  }

  extractErrorMessages(errors: { [key: string]: string[] }): string[] {
    return Object.values(errors).flat();
  }

  extractErrorPassword(
    errors: { code: string; description: string }[]
  ): string[] {
    return errors.map((error) => error.description);
  }
}
