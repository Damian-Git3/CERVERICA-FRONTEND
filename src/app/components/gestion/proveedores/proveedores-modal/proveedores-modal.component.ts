import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  proveedoresForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    empresa: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    nombreContacto: new FormControl(''),
    activo: new FormControl(''),
  });
  public titulo: string = '';
  public labelBoton: string = '';
  public modificar: boolean = false;

  constructor(
    private proveedoresService: ProveedoresService,
    private alertasService: AlertasService
  ) {}

  ngOnInit(): void {

  }

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
      this.titulo = 'Crear Proveedor';
      this.labelBoton = 'Crear';
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
      .pipe(finalize(() => { }))
      .subscribe({
        next: (data: any) => {
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
      .pipe(finalize(() => { }))
      .subscribe({
        next: (data: any) => {
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
}
