import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrarDTO, RegistrarMayoristaDTO } from '../../../interfaces/usuario/registrar-dto';
import { AccountService } from '../../../services/account/account.service';
import { CompartidoService } from '../../../services/compartido/compartido.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth/auth.service';
import { CarritoService } from '../../../services/carrito/carrito.service';
import { finalize } from 'rxjs';
import { initializeLoginAnimations } from './animations';

@Component({
  selector: 'app-registrar-mayorista',
  templateUrl: './registrar-mayorista.component.html',
  styleUrl: './registrar-mayorista.component.css'
})
export class RegistrarMayoristaComponent implements AfterViewInit {
  @ViewChild('contenedorLogin') contenedorLogin!: ElementRef;
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('mensajesCrearCuenta') mensajesCrearCuenta!: ElementRef;
  @ViewChild('mensajesLogin') mensajesLogin!: ElementRef;

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
    this.formCrearCuenta = this.formBuilder.group({
      // DATOS DE USUARIO
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],

      // DATOS DE LA EMPRESA
      nombreEmpresa: ['', Validators.required],
      direccionEmpresa: ['', Validators.required],
      telefonoEmpresa: ['', Validators.required],
      emailEmpresa: ['', [Validators.required, Validators.email]],

      // DATOS DEL CONTACTO
      cargoContacto: [''],
      telefonoContacto: ['', Validators.required]

    });
  }

  ngAfterViewInit() {
    this.intervalId = initializeLoginAnimations(
      this.contenedorLogin
    );
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  crearCuenta() {
    this.creandoCuenta = true;

    let usuarioRegistrar: RegistrarMayoristaDTO = {
      // Datos de usuario
      password: this.formCrearCuenta.value.password,
      rol: 'mayorista',
    
      // Datos de la empresa
      nombreEmpresa: this.formCrearCuenta.value.nombreEmpresa,
      direccionEmpresa: this.formCrearCuenta.value.direccionEmpresa,
      telefonoEmpresa: this.formCrearCuenta.value.telefonoEmpresa,
      emailEmpresa: this.formCrearCuenta.value.emailEmpresa,
    
      // Datos de contacto
      nombreContacto: this.formCrearCuenta.value.fullName,
      emailContacto: this.formCrearCuenta.value.email,
      cargoContacto: this.formCrearCuenta.value.cargoContacto,
      telefonoContacto: this.formCrearCuenta.value.telefonoContacto,
    };
    

    console.log("USUARIO A REGISTRAR")
    console.log(usuarioRegistrar)

    this._AccountService
      .registrarCuentaMayorista(usuarioRegistrar)
      .pipe(
        finalize(() => {
          this.creandoCuenta = false;
        }),
      )
      .subscribe({
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
        },
        error: (error) => {
          if (error.error.isSuccess == false) {
            this.mensajesCrearCuenta.nativeElement.innerHTML = `<p>${error.error.message}</p>`;

            let errors = this._CompartidosService.extractErrors(
              error.error.errors,
            );

            this.mensajesCrearCuenta.nativeElement.innerHTML += errors
              .map((error) => `<p>${error}</p>`)
              .join('');
          } else {
            if (error.error) {
              let errors = this._CompartidosService.extractErrorPassword(
                error.error,
              );

              this.mensajesCrearCuenta.nativeElement.innerHTML = errors
                .map((error) => `<p>${error}</p>`)
                .join('');
            }
          }
        },
      });
  }
}
