import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InsumosService } from '../../../../services/insumos/insumos.service';
import { catchError, finalize } from 'rxjs';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-insumos-modal',
  templateUrl: './insumos-modal.component.html',
  styleUrls: ['./insumos-modal.component.css'],
})
export class InsumosModalComponent implements OnInit {
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  public display: boolean = false;
  public titulo: string = '';
  public labelBoton: string = '';
  public modificar: boolean = false;
  public unidadesMedida: any[] = ['KG', 'L', 'PZ'];
  public mensajesError: string = '';
  cargando: boolean = false;

  insumoForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    unidadMedida: new FormControl('', [Validators.required]),
    cantidadMaxima: new FormControl('', [Validators.required]),
    cantidadMinima: new FormControl('', [Validators.required]),
    merma: new FormControl('', [Validators.required]),
  });

  constructor(
    private insumosService: InsumosService,
    private alertasService: AlertasService,
  ) {}

  ngOnInit() {}

  get f() {
    return this.insumoForm.controls;
  }

  // Método para obtener todos los errores del formulario
  obtenerErrores(): string {
    let mensajes: string[] = [];

    // Primero, verifica si hay errores en el formulario general
    if (this.insumoForm.errors) {
      Object.keys(this.insumoForm.errors).forEach((errorKey) => {
        let mensaje: string;
        switch (errorKey) {
          case 'cantidadError':
            mensaje =
              'Error en las cantidades: ' + this.insumoForm.errors![errorKey];
            break;
          default:
            mensaje = `Error general: ${errorKey}`;
            break;
        }
        mensajes.push(mensaje);
      });
    }

    // Luego, revisa los errores específicos de cada control
    Object.keys(this.insumoForm.controls).forEach((key) => {
      const control = this.insumoForm.get(key);
      if (control && control.errors) {
        Object.keys(control.errors).forEach((errorKey) => {
          let mensaje: string;
          switch (errorKey) {
            case 'required':
              mensaje = `${key} es requerido`;
              break;
            case 'min':
              mensaje = `${key} es menor al valor mínimo permitido`;
              break;
            case 'max':
              mensaje = `${key} excede el valor máximo permitido`;
              break;
            default:
              mensaje = `Error en ${key}`;
              break;
          }
          mensajes.push(mensaje);
        });
      }
    });

    return mensajes.join('<br>');
  }

  public show(id?: number) {
    this.display = true;

    if (id) {
      this.cargando = true;
      this.modificar = true;
      this.titulo = 'Editar Insumo';
      this.labelBoton = 'Actualizar';
      this.insumosService
        .obtenerPorId(id)
        .pipe(
          catchError((error) => {
            console.error(error);
            return error;
          }),
        )
        .subscribe({
          next: (data: any) => {
            this.cargando = false;
            this.alertasService.showSuccess('Insumo obtenido correctamente');
            this.insumoForm.patchValue(data);
          },
          error: (error: any) => {
            this.cargando = false;
            this.alertasService.showError('Error al obtener el insumo');
            console.error(error);
          },
        });
    } else {
      this.modificar = false;
      this.labelBoton = 'Guardar';
      this.titulo = 'Crear Insumo';
    }
  }

  public ocultar() {
    this.display = false;
    this.insumoForm.reset();
    this.reload.emit();
  }

  guardar() {
    this.mensajesError = '';

    if (
      parseFloat(this.insumoForm.value.cantidadMaxima) <
      parseFloat(this.insumoForm.value.cantidadMinima)
    ) {
      this.insumoForm.setErrors({
        cantidadError: 'La cantidad máxima no puede ser menor que la mínima',
      });
    } else if (
      parseFloat(this.insumoForm.value.cantidadMinima) >
      parseFloat(this.insumoForm.value.cantidadMaxima)
    ) {
      this.insumoForm.setErrors({
        cantidadError: 'La cantidad mínima no puede ser mayor que la máxima',
      });
    }

    if (this.insumoForm.invalid) {
      this.mensajesError = this.obtenerErrores();
      this.alertasService.showError(
        'Verifica el formulario',
        'Tienes campos invalidas, validalos',
      );
      return;
    }

    this.cargando = true;

    this.insumosService
      .crear(this.insumoForm.value)
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Insumo creado correctamente');
          console.log(data);
          this.ocultar();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al crear el insumo');
          console.error(error);
        },
      });
  }

  actualizar() {
    if (this.insumoForm.invalid) {
      this.mensajesError = this.obtenerErrores();

      this.alertasService.showError(
        'Verifica el formulario',
        'Tienes campos invalidas, validalos',
      );
      return;
    }

    this.cargando = true;
    this.insumosService
      .modificar(this.f['id'].value, this.insumoForm.value)
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Insumo actualizado correctamente');
          this.ocultar();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al actualizar el insumo');
          console.error(error);
        },
      });
  }

  get minFractionDigits(): number {
    return this.insumoForm.value.unidadMedida === 'PZ' ? 0 : 2;
  }
}
