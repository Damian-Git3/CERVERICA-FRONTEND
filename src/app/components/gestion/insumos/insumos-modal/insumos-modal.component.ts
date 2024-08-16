import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { InsumosService } from '../../../../services/insumos/insumos.service';
import { IInsumo } from '../../../../interfaces/insumo.interface';
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
  public mensajesError: string = ''; // Variable para almacenar los mensajes de error

  insumoForm: FormGroup = new FormGroup(
    {
      id: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      unidadMedida: new FormControl(''),
      cantidadMaxima: new FormControl('', [Validators.required]),
      cantidadMinima: new FormControl('', [Validators.required]),
      costoUnitario: new FormControl({ value: '', disabled: true }),
      merma: new FormControl(''),
      activo: new FormControl(''),
    },
    { validators: this.cantidadValidator() }
  );

  constructor(
    private insumosService: InsumosService,
    private alertasService: AlertasService
  ) {}

  ngOnInit() {
    console.log('InsumosModalComponent inicializado');
  }

  get f() {
    return this.insumoForm.controls;
  }

  // Función de validación personalizada para cantidad mínima y máxima
  cantidadValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: boolean } | null => {
      const cantidadMaxima = group.get('cantidadMaxima')?.value;
      const cantidadMinima = group.get('cantidadMinima')?.value;

      if (cantidadMaxima < cantidadMinima) {
        return { maximamenor: true };
      } else if (cantidadMaxima > cantidadMinima) {
        return { menormaxima: true };
      }

      return null;
    };
  }

  // Método para obtener todos los errores del formulario
  obtenerErrores(): string {
    let mensajes: string[] = [];

    Object.keys(this.insumoForm.controls).forEach((key) => {
      const control = this.insumoForm.get(key);
      if (control && control.errors) {
        Object.keys(control.errors).forEach((errorKey) => {
          let mensaje: string;
          switch (errorKey) {
            case 'required':
              mensaje = `${key} es requerido`;
              break;
            case 'maximamenor':
              mensaje = 'La cantidad máxima no puede ser menor que la mínima';
              break;
            case 'menormaxima':
              mensaje = 'La cantidad mínima no puede ser mayor que la máxima';
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
      console.log(id);
      this.modificar = true;
      this.titulo = 'Editar Insumo';
      this.labelBoton = 'Actualizar';
      this.insumosService
        .obtenerPorId(id)
        .pipe(
          catchError((error) => {
            console.error(error);
            return error;
          })
        )
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.alertasService.showSuccess('Insumo obtenido correctamente');
            this.insumoForm.setValue(data);
          },
          error: (error: any) => {
            this.alertasService.showError('Error al obtener el insumo');
            console.error(error);
          },
        });
    } else {
      this.modificar = false;
      this.labelBoton = 'Guardar';
      this.titulo = 'Crear Insumo';
    }

    console.log(this.insumoForm.value);
  }

  public ocultar() {
    this.display = false;
    this.insumoForm.reset();
    this.reload.emit();
  }

  guardar() {
    if (this.insumoForm.invalid) {
      this.mensajesError = this.obtenerErrores();
      this.alertasService.showError(
        'Verifica el formulario',
        'Tienes campos invalidas, validalos'
      );
      return;
    }

    this.insumosService
      .crear(this.insumoForm.value)
      .pipe(finalize(() => {}))
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

      console.log(this.mensajesError);

      this.alertasService.showError(
        'Verifica el formulario',
        'Tienes campos invalidas, validalos'
      );
      return;
    }

    this.insumosService
      .modificar(this.f['id'].value, this.insumoForm.value)
      .pipe(finalize(() => {}))
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
}
