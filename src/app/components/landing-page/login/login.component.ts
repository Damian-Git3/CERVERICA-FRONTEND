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
    initializeLoginAnimations(this.contenedorLogin, this.carousel);
  }

  iniciarSesion() {
    let usuarioIngresar: LoginDTO = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    this._AccountService.iniciarSesion(usuarioIngresar).subscribe({
      next: (response) => {
        console.log(response);

        if (response.isSuccess == false) {
          this.mensajesLogin.nativeElement.innerHTML = `<p>${response.message}</p>`;
        }

        //this._CompartidosService.guardarSesion(response);
        //this.router.navigate(['layout']);
      },
      complete: () => {
        console.log('Completado');
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
    let usuarioRegistrar: RegistrarDTO = {
      fullName: this.formCrearCuenta.value.fullName,
      email: this.formCrearCuenta.value.email,
      password: this.formCrearCuenta.value.password,
      roles: ['cliente'],
    };

    this._AccountService.registrarCuenta(usuarioRegistrar).subscribe({
      next: (response) => {
        console.log(response);

        if (response.isSuccess == false) {
          this.mensajesLogin.nativeElement.innerHTML = `<p>${response.message}</p>`;
        }
        //this._CompartidosService.guardarSesion(response);
        //this.router.navigate(['layout']);
      },
      complete: () => {
        console.log('Completado');
      },
      error: (error) => {
        if (error.error) {
          let errors = this._CompartidosService.extractErrorPassword(
            error.error
          );

          this.mensajesCrearCuenta.nativeElement.innerHTML = errors
            .map((error) => `<p>${error}</p>`)
            .join('');
        }
      },
    });
  }
}
