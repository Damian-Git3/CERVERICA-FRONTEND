import { Injectable } from '@angular/core';
import { SesionDTO } from '../../interfaces/usuario/sesion-dto';
import { CarritoService } from '../carrito/carrito.service';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CompartidoService {
  constructor(
    private _CarritoService: CarritoService,
    private _AuthService: AuthService,
    private _MessageService: MessageService,
    private _Router: Router
  ) {}

  guardarSesion(sesion: SesionDTO) {
    localStorage.setItem('usuarioSesion', JSON.stringify(sesion));
  }

  obtenerSesion(): SesionDTO {
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

  extractErrors(errors: [string]): string[] {
    return errors.map((error) => error);
  }

  tokenExpirado() {
    this._MessageService.add({
      severity: 'info',
      summary: 'Logueo necesario',
      detail: 'Tu sesión expiro por favor vuelve a iniciar sesión',
    });
    this.eliminarSesion();
    this._AuthService.logout();
    this._CarritoService.vaciarProductosCarrito();
    this._Router.navigateByUrl('/cerverica/login');
  }
}
