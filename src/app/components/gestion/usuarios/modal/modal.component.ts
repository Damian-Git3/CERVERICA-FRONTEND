import {
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { UsuarioDTO } from '../../../../interfaces/usuarios/usuario-dto';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { CrearUsuarioDTO } from '../../../../interfaces/usuarios/crear-usuario-dto';
import { finalize } from 'rxjs';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { CompartidoService } from '../../../../services/compartido/compartido.service';
import { EditarUsuarioDTO } from '../../../../interfaces/usuarios/editar-usuario-dto';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal!: Dialog;

  _UsuariosService = inject(UsuariosService);
  _AlertasService = inject(AlertasService);
  _CompartidoService = inject(CompartidoService);

  public mostrarModal: boolean = false;
  public nuevo: boolean = false;
  public cargando: boolean = false;
  public mensajesError: string = '';
  public idUsuario: string = '';
  roles: string[] = ['Cliente', 'Operador', 'Admin'];

  public form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    rol: new FormControl(''),
    contrasenia: new FormControl(''),
  });

  get campo(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  show(usuario?: UsuarioDTO) {
    this.mostrarModal = true;
    this.form.reset();
    if (usuario) {
      this.modal.header = 'Editar Usuario';
      this.nuevo = false;
      this.form.patchValue(usuario);
      this.idUsuario = usuario.id;
    } else {
      this.modal.header = 'Crear Usuario';
      this.nuevo = true;
    }
  }

  registrar() {
    this.cargando = true;
    let nuevo: CrearUsuarioDTO = {
      nombre: this.form.value.nombre,
      correo: this.form.value.correo,
      rol: this.form.value.rol,
      password: this.form.value.contrasenia,
    };

    this._UsuariosService
      .agregarUsuario(nuevo)
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: () => {
          this._AlertasService.showSuccess(
            'EL usuario fue guardado exitosamente',
            'Usuario guardado',
          );
          this.reload.emit();
          this.mostrarModal = false;
        },
        error: (error: any) => {
          if (error.status == 400) {
            this._AlertasService.showInfo(
              'Verifica los mensajes e intenta de nuevo',
              'Ocurrió un problema',
            );

            this.mensajesError =
              this._CompartidoService.extraerMensajesCodigo400(error.error);
          } else {
            this._AlertasService.showError(
              'No se pudo guardar el usuario vuelve a intentarlo',
              'Ocurrió un problema',
            );
          }
          console.error(error);
        },
      });
  }

  editar() {
    this.cargando = true;

    let usuarioEditar: EditarUsuarioDTO = {
      nombre: this.form.value.nombre,
      correo: this.form.value.correo,
      rol: this.form.value.rol,
      password: this.form.value.contrasenia,
    };

    this._UsuariosService
      .editarUsuario(this.idUsuario, usuarioEditar)
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: () => {
          this._AlertasService.showSuccess(
            'EL usuario fue editado exitosamente',
            'Usuario editado',
          );
          this.reload.emit();
          this.mostrarModal = false;
        },
        error: (error: any) => {
          if (error.status == 400) {
            this._AlertasService.showInfo(
              'Verifica los mensajes e intenta de nuevo',
              'Ocurrió un problema',
            );

            this.mensajesError =
              this._CompartidoService.extraerMensajesCodigo400(error.error);
          } else {
            this._AlertasService.showError(
              'No se pudo guardar el usuario vuelve a intentarlo',
              'Ocurrió un problema',
            );
          }
          console.error(error);
        },
      });
  }

  hide() {
    this.mostrarModal = false;
  }
}
