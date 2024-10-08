import { Injectable } from '@angular/core';
import { SesionDTO } from '../../interfaces/usuario/sesion-dto';
import { CarritoService } from '../carrito/carrito.service';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductoCarrito } from '../../interfaces/carrito/producto-carrito';
import { AccountService } from '../account/account.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompartidoService {
  private tituloModulo: string = '';
  private _TituloModulo: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  constructor(
    private _CarritoService: CarritoService,
    private _AuthService: AuthService,
    private _MessageService: MessageService,
    private _AccountService: AccountService,
    private _Router: Router
  ) {}

  get TituloModulo() {
    return this._TituloModulo.asObservable();
  }

  actualizarTitulo(nuevoTitulo: string) {
    this._TituloModulo.next(nuevoTitulo.toUpperCase());
  }

  guardarSesion(sesion: SesionDTO) {
    localStorage.setItem('usuarioSesion', JSON.stringify(sesion));
  }

  solicitarActualizarProductos() {
    this._CarritoService
      .obtenerProductosCarrito(this.obtenerSesion().token)
      .subscribe({
        next: (productosCarrito: ProductoCarrito[]) => {
          this._CarritoService.asignarListaProductosCarrito(productosCarrito);
        },
        error: (e) => {
          console.error('Error al obtener productos carrito:', e);
        },
      });
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

  usuarioEnMemoria(): boolean {
    return this.obtenerSesion() != null;
  }

  extraerMensajesCodigo400(
    errorArray: { code: string; description: string }[]
  ): string {
    const errorMessages = errorArray.map((error) => error.description);
    return errorMessages.join('<br>');
  }

  cerrarSesion() {
    this._AccountService.cerrarSesion(this.obtenerSesion().token).subscribe({
      next: (response) => {
        if (response.isSuccess == true) {
          this._MessageService.add({
            severity: 'info',
            summary: 'Ya te vas?',
            detail: 'Esperamos verte de nuevo :)',
          });

          this.eliminarSesion();
          this._AuthService.logout();
          this._CarritoService.vaciarProductosCarrito();
          this._Router.navigateByUrl('/cerverica');
        }
      },
      complete: () => {},
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
