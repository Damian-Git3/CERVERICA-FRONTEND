import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from '../../../../services/proveedores/proveedores.service';
import { finalize } from 'rxjs';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-proveedores-modal',
  templateUrl: './proveedores-modal.component.html',
  styleUrl: './proveedores-modal.component.css',
})
export class ProveedoresModalComponent implements OnInit {
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  display: boolean = false;

  proveedoresForm: FormGroup;

  public titulo: string = '';
  public labelBoton: string = '';
  public modificar: boolean = false;

  constructor(
    private proveedoresService: ProveedoresService,
    private alertasService: AlertasService,
    private fb: FormBuilder
  ) {
    this.proveedoresForm = this.fb.group({
      id: [null],
      empresa: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      telefono: [
        null,
        [
          Validators.required,
            Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(com|mx|net|org|edu)$'
          ),
        ],
      ],
      nombreContacto: [null, [Validators.required]],
      activo: [null],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.proveedoresForm.controls;
  }

  show(id?: number) {
    this.display = true;

    if (id) {
      this.modificar = true;
      this.titulo = 'Modificar Proveedor';
      this.labelBoton = 'Modificar';
      this.obtener(id);
    } else {
      this.modificar = false;
      this.titulo = 'Nuevo Proveedor';
      this.labelBoton = 'Guardar';
    }
  }

  ocultar() {
    this.display = false;
    this.proveedoresForm.reset();
  }

  obtener(id: number) {
    this.proveedoresService
      .obtenerPorId(id)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Proveedor obtenido correctamente');
          console.log(data);
          this.proveedoresForm.patchValue(data);
        },
        error: (error: any) => {
          this.alertasService.showError('Error al obtener el proveedor');
          console.log(error);
        },
      });
  }

  guardar() {
    this.proveedoresService
      .crear(this.proveedoresForm.value)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.alertasService.showSuccess('Proveedor creado correctamente');
          this.reload.emit();
          this.ocultar();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al crear el proveedor');
          console.log(error);
        },
      });
  }

  actualizar() {
    console.log(this.proveedoresForm.value);
    this.proveedoresService
      .modificar(this.f['id'].value, this.proveedoresForm.value)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.alertasService.showSuccess('Proveedor modificado correctamente');
          this.reload.emit();
          this.ocultar();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al modificar el proveedor');
          console.log(error);
        },
      });
  }

  obtenerErrores(control: string) {
    /* MOSTRAMOS LAS VALIDACIONES QUE NECESITA EL CAMPO EN CONSOLA */

    /* MOSTRAMOS LOS ERRORES EN CONSOLA */
    console.log('ERRORES', this.proveedoresForm.get(control)?.errors);
  }
}
