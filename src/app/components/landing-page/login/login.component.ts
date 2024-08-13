import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from '../../../interfaces/usuario/login-dto';
import { RegistrarDTO } from '../../../interfaces/usuario/registrar-dto';
import { AccountService } from '../../../services/account/account.service';
import { CompartidoService } from '../../../services/compartido/compartido.service';
import { initializeLoginAnimations } from './animations';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth/auth.service';
import { CarritoService } from '../../../services/carrito/carrito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('contenedorLogin') contenedorLogin!: ElementRef;
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('mensajesCrearCuenta') mensajesCrearCuenta!: ElementRef;
  @ViewChild('mensajesLogin') mensajesLogin!: ElementRef;

  formLogin: FormGroup;
  formCrearCuenta: FormGroup;
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  _AccountService = inject(AccountService);
  _CompartidosService = inject(CompartidoService);
  _MessageService = inject(MessageService);
  _AuthService = inject(AuthService);
  _CarritoService = inject(CarritoService);

  private intervalId: any;
  iniciandoSesion: boolean = false;
  creandoCuenta: boolean = false;

  constructor() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.formCrearCuenta = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.intervalId = initializeLoginAnimations(
      this.contenedorLogin,
      this.carousel
    );
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  iniciarSesion() {
    this.iniciandoSesion = true;

    let usuarioIngresar: LoginDTO = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    this._AccountService.iniciarSesion(usuarioIngresar).subscribe({
      next: (response) => {
        if (response.isSuccess == false) {
          this.mensajesLogin.nativeElement.innerHTML = `<p>${response.message}</p>`;
        } else {
          this._MessageService.add({
            severity: 'success',
            summary: `Bienvenido ${response.nombre}!`,
            detail: '¡Qué gusto verte de nuevo!',
          });

          this._CompartidosService.guardarSesion(response);

          this._AuthService.login();

          console.log(response);

          if(response.rol == 'Cliente'){
            this.router.navigateByUrl('/perfil');
          } else{
            this.router.navigateByUrl('/gestion');
          }
        }
      },
      complete: () => {
        this.iniciandoSesion = false;
      },
      error: (error) => {
        if (error.error.isSuccess == false) {
          this.mensajesLogin.nativeElement.innerHTML = `<p>${error.error.message}</p>`;
        } else {
          if (error.error.errors) {
            let errors = this._CompartidosService.extractErrorMessages(
              error.error.errors
            );

            this.mensajesLogin.nativeElement.innerHTML = errors
              .map((error) => `<p>${error}</p>`)
              .join('');
          }
        }
      },
    });
  }

  crearCuenta() {
    this.creandoCuenta = true;

    let usuarioRegistrar: RegistrarDTO = {
      fullName: this.formCrearCuenta.value.fullName,
      email: this.formCrearCuenta.value.email,
      password: this.formCrearCuenta.value.password,
      role: 'cliente',
    };

    this._AccountService.registrarCuenta(usuarioRegistrar).subscribe({
      next: (response) => {
        if (response.isSuccess == false) {
          this.mensajesCrearCuenta.nativeElement.innerHTML = `<p>${response.message}</p>`;
        }
      },
      complete: () => {
        this.contenedorLogin.nativeElement.classList.remove('sign-up-mode');

        this._MessageService.add({
          severity: 'success',
          summary: 'Cuenta creada correctamente',
          detail: 'Inicia sesión con tu información',
        });

        this.formCrearCuenta.reset();
        this.creandoCuenta = false;
      },
      error: (error) => {
        if (error.error.isSuccess == false) {
          this.mensajesCrearCuenta.nativeElement.innerHTML = `<p>${error.error.message}</p>`;

          let errors = this._CompartidosService.extractErrors(
            error.error.errors
          );

          this.mensajesCrearCuenta.nativeElement.innerHTML += errors
            .map((error) => `<p>${error}</p>`)
            .join('');
        } else {
          if (error.error) {
            let errors = this._CompartidosService.extractErrorPassword(
              error.error
            );

            this.mensajesCrearCuenta.nativeElement.innerHTML = errors
              .map((error) => `<p>${error}</p>`)
              .join('');
          }
        }
        this.creandoCuenta = false;
      },
    });
  }
}
