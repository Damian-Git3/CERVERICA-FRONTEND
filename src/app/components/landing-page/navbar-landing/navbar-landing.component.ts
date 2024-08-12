import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/account/account.service';
import { CompartidoService } from '../../../services/compartido/compartido.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth/auth.service';
import { CarritoService } from '../../../services/carrito/carrito.service';

@Component({
  selector: 'app-navbar-landing',
  templateUrl: './navbar-landing.component.html',
  styleUrl: './navbar-landing.component.css',
})
export class NavbarLandingComponent {
  constructor(private route: ActivatedRoute) {}

  isLoggedIn: boolean = false;
  _AccountService: AccountService = inject(AccountService);
  _CompartidoService: CompartidoService = inject(CompartidoService);
  Router: Router = inject(Router);
  _MessageService: MessageService = inject(MessageService);
  _AuthService: AuthService = inject(AuthService);
  _CarritoService: CarritoService = inject(CarritoService);

  productosEnCarrito: number = 0;
  primerNombre: string = '';

  ngOnInit() {
    this._AuthService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {
        this.primerNombre = this._CompartidoService
          .obtenerSesion()
          .nombre.split(' ')[0];
      }
    });
    this._AuthService.checkLoginStatus();
    this._CarritoService.ProductosCarrito.subscribe((productosCarrito) => {
      this.productosEnCarrito = productosCarrito.length;
    });
  }

  logout() {
    this._AccountService
      .cerrarSesion(this._CompartidoService.obtenerSesion().token)
      .subscribe({
        next: (response) => {
          if (response.isSuccess == true) {
            this._MessageService.add({
              severity: 'info',
              summary: 'Ya te vas?',
              detail: 'Esperamos verte de nuevo :)',
            });

            this._CompartidoService.eliminarSesion();

            this._AuthService.logout();

            this.Router.navigateByUrl('/cerverica/inicio');
          }
        },
        complete: () => {},
        error: (error) => {
          console.log(error);
        },
      });
  }
}
