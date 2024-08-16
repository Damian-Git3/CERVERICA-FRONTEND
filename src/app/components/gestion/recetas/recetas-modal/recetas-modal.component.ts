import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
    litrosEstimados: new FormControl(0),
    descripcion: new FormControl(''),
    especificaciones: new FormControl({ value: null, disabled: false }),
    nombre: new FormControl(''),
    imagen: new FormControl(''),
    rutaFondo: new FormControl(''),
    precioPaquete1: new FormControl(0),
    precioPaquete6: new FormControl(0),
    precioPaquete12: new FormControl(0),
    precioPaquete24: new FormControl(0),
    ingredientesReceta: new FormArray([
      new FormGroup({
        idInsumo: new FormControl(1),
        cantidad: new FormControl(0),
      }),
    ]),
  });

  constructor(
    private recetasService: RecetaService,
    private alertasService: AlertasService
  ) {}

  ngOnInit() {
    console.log('RecetasModalComponent inicializado');
  }

  get f() {
    return this.recetaForm.controls;
  }

  public show(id?: number) {
    this.display = true;

    if (id) {
      this.modal.header = 'Editar Receta';
      this.modificar = true;
      this.obtenerReceta(id);
    } else {
      this.modificar = false;
      this.btnGuardar.label = 'Guardar';
      this.modal.header = 'Crear Receta';
    }
  }

  public ocultar() {
    this.display = false;
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

  obtenerReceta(id: number) {
    this.recetasService
      .obtenerPorId(id)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          this.f['id'].setValue(data.id);
          this.f['litrosEstimados'].setValue(data.litrosEstimados);
          this.f['descripcion'].setValue(data.descripcion);
          this.f['especificaciones'].setValue(data.especificaciones);
          this.f['nombre'].setValue(data.nombre);
          this.f['imagen'].setValue(data.imagen);
          this.f['rutaFondo'].setValue(data.rutaFondo);
          this.f['precioPaquete1'].setValue(data.precioPaquete1);
          this.f['precioPaquete6'].setValue(data.precioPaquete6);
          this.f['precioPaquete12'].setValue(data.precioPaquete12);
          this.f['precioPaquete24'].setValue(data.precioPaquete24);

          console.log(this.recetaForm.value);
        },
        error: (error: any) => {
          this.alertasService.showError('Error al obtener la receta');
        },
      });
  }

  
}
