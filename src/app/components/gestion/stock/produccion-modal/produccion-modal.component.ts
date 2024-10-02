import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { Producto } from '../../../../interfaces/productos/producto';
import { ProduccionesService } from '../../../../services/producciones/producciones.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { AccountService } from '../../../../services/account/account.service';

@Component({
  selector: 'app-produccion-modal',
  templateUrl: './produccion-modal.component.html',
  styleUrl: './produccion-modal.component.css'
})
export class ProduccionModalComponent implements OnInit {
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();

  public display: boolean = false;
  public titulo: string = '';
  public labelBoton: string = '';
  public modificar: boolean = false;
  public unidadesMedida: any[] = ['KG', 'L', 'PZ'];
  public mensajesError: string = '';
  productoSeleccionado?: Producto;
  cargando: boolean = false;
  idUsuario: string = "";

  produccionForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    cantidadProducir: new FormControl('', [Validators.required])
  });

  constructor(
    private _produccionesService: ProduccionesService,
    private _authService: AuthService,
    private _accountService: AccountService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() { }

  get f() {
    return this.produccionForm.controls;
  }

  // Método para obtener todos los errores del formulario
  obtenerErrores(): string {
    let mensajes: string[] = [];

    // Primero, verifica si hay errores en el formulario general
    if (this.produccionForm.errors) {
      Object.keys(this.produccionForm.errors).forEach((errorKey) => {
        let mensaje: string;
        switch (errorKey) {
          case 'cantidadError':
            mensaje =
              'Error en las cantidades: ' + this.produccionForm.errors![errorKey];
            break;
          default:
            mensaje = `Error general: ${errorKey}`;
            break;
        }
        mensajes.push(mensaje);
      });
    }

    // Luego, revisa los errores específicos de cada control
    Object.keys(this.produccionForm.controls).forEach((key) => {
      const control = this.produccionForm.get(key);
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

  public show(producto?: Producto) {
    this.display = true;

    if (producto) {
      this.cargando = true;
      this.modificar = true;
      this.titulo = 'Solicitar Producción';
      this.labelBoton = 'Guardar';
      this.cargando = false;
      this.alertasService.showSuccess('Producto obtenido correctamente');
      this.productoSeleccionado = producto
      this.produccionForm.patchValue(this.productoSeleccionado);

    }
  }

  public ocultar() {
    this.display = false;
    this.produccionForm.reset();
    this.reload.emit();
  }

  guardar() {
    this.mensajesError = '';


    if (this.produccionForm.invalid) {
      this.mensajesError = this.obtenerErrores();
      this.alertasService.showError(
        'Verifica el formulario',
        'Tienes campos inválidos, valídalos'
      );
      return;
    }

    this._accountService.obtenerPerfil().subscribe({
      next: (data: any) => {
        this.idUsuario = data.id
        console.log(this.idUsuario)

        // Aquí se asegura de que se envíe el formulario con los datos correctos
        const produccionData = {
          numeroTandas: this.produccionForm.value.cantidadProducir,
          idReceta: this.productoSeleccionado?.id,
          idUsuario: this.idUsuario
        };

        console.log("Data enviada:");
        console.log(produccionData);

        this.cargando = true;

        this._produccionesService
          .crear(produccionData)
          .pipe(finalize(() => (this.cargando = false)))
          .subscribe({
            next: (data: any) => {
              this.alertasService.showSuccess('Producción solicitada correctamente');
              console.log(data);
              this.ocultar();
            },
            error: (error: any) => {
              this.alertasService.showError('Error al solicitar la producción');
              console.error(error);
            },
          });
      },
      error: (error: any) => {
        console.error('Error al obtener el perfil:', error);  // Maneja cualquier error
      }
    });
  }

}
