import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { IReceta } from '../../../../interfaces/receta.interface';
import { RecetaService } from '../../../../services/receta/receta.service';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-recetas-modal',
  templateUrl: './recetas-modal.component.html',
  styleUrl: './recetas-modal.component.css',
})
export class RecetasModalComponent implements OnInit {
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal!: Dialog;
  @ViewChild('btnGuardar') btnGuardar!: Button;
  public display: boolean = false;
  public receta: IReceta | undefined;
  public titulo: string = '';
  public labelBoton: string = '';
  public modificar: boolean = false;

  public recetaForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    litrosEstimados: new FormControl(''),
    descripcion: new FormControl(''),
    especificaciones: new FormControl({value: null, disabled: false}),
    nombre: new FormControl(''),
    imagen: new FormControl(''),
    rutaFondo: new FormControl(''),
    /* ARREGLO DE INGREDIENTES */
    ingredientes: new FormArray([
      new FormGroup({
        idInsumo: new FormControl(''),
        cantidad: new FormControl(''),
      }),
    ]),
  });

  constructor(private recetasService: RecetaService, private alertasService: AlertasService) {}

  ngOnInit() {
    console.log('RecetasModalComponent inicializado');
  }

  get f() {
    return this.recetaForm.controls;
  }

  public show(receta?: IReceta | undefined) {
    this.display = true;

    if (receta) {
      this.modificar = true;
      this.modal.header = 'Editar Receta';
      this.btnGuardar.label = 'Actualizar';
      this.receta = receta;
      this.recetaForm.setValue(receta);
    } else {
      this.modificar = false;
      this.btnGuardar.label = 'Guardar';
      this.modal.header = 'Crear Receta';

    }

  }

  public ocultar() {
    this.modal.visible = false;
    this.recetaForm.reset();
    this.receta = undefined;
    this.reload.emit();
  }

  public guardar() {
    this.recetasService
      .crear(this.recetaForm.value)
      .pipe(finalize(() => this.ocultar()))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Receta creada correctamente');
          console.log(data);
        },
        error: (error: any) => {
          this.alertasService.showError('Error al crear la receta');
          console.error(error);
        },
      });
  }

  actualizar() {
    this.recetasService
      .modificar(this.f['id'].value, this.recetaForm.value)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Receta actualizada correctamente');
          console.log(data);
          this.ocultar();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al actualizar la receta');
          console.error(error);
        },
      });
  }
}
