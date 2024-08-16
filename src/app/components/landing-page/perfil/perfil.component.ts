import { Component, inject } from '@angular/core';
import { CompartidoService } from '../../../services/compartido/compartido.service';
import { SesionDTO } from '../../../interfaces/usuario/sesion-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account/account.service';
import { ChangePasswordDTO } from '../../../interfaces/usuario/change-password-dto';
import { finalize } from 'rxjs';
import { AlertasService } from '../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  _CompartidoService = inject(CompartidoService);
  _AlertasService = inject(AlertasService);
  _AccountService = inject(AccountService);
  _FormBuilder = inject(FormBuilder);

  sesionActual!: SesionDTO;
  inicialesNombre!: string;
  cargando: boolean = false;
  formPerfil: FormGroup;
  mensajesError: string = '';

  constructor() {
    this.formPerfil = this._FormBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      passwordConfirm: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sesionActual = this._CompartidoService.obtenerSesion();
    this.inicialesNombre = this.obtenerIniciales(this.sesionActual.nombre);
  }

  obtenerIniciales(nombre: string): string {
    const partes = nombre.split(' ');
    const iniciales = partes.map((parte) => parte.charAt(0)).join('');
    return iniciales.toUpperCase();
  }

  actualizarPerfil() {
    this.mensajesError = '';

    if (
      this.formPerfil.value.newPassword == this.formPerfil.value.passwordConfirm
    ) {
      this.cargando = true;

      let changePasswordDTO: ChangePasswordDTO = {
        email: this.sesionActual.email,
        currentPassword: this.formPerfil.value.currentPassword,
        newPassword: this.formPerfil.value.newPassword,
      };

      this._AccountService
        .cambiarContrasena(changePasswordDTO)
        .pipe(finalize(() => (this.cargando = false)))
        .subscribe({
          next: (sesionDTO: SesionDTO) => {
            if (sesionDTO.isSuccess) {
              this._AlertasService.alertaSuccess(
                'Cambio de contraseña exitoso',
                'Por favor, vuelve a iniciar sesión para aplicar los cambios.'
              );
              this._CompartidoService.cerrarSesion();
            }
          },
          error: (respuestaError: any) => {
            if (!respuestaError.error.isSuccess) {
              this.mensajesError = respuestaError.error.message;
            } else{
              this.mensajesError = "Tuviste un error por favor vuelve a intentarlo"
            }
          },
        });
    } else {
      this.mensajesError =
        'Las contraseñas no coindicen, por favor verificalas';
    }
  }
}
