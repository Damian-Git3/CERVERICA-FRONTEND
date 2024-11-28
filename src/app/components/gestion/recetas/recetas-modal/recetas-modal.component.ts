import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { IReceta } from '../../../../interfaces/receta.interface';
import { RecetaService } from '../../../../services/receta/receta.service';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { InsumosService } from '../../../../services/insumos/insumos.service';

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
  public insumos: any[] = [];
  public insumosSeleccionados: any[] = [];

  public recetaForm: FormGroup = this.fb.group({
    id: new FormControl(null),
    litrosEstimados: new FormControl(0, [Validators.required]),
    descripcion: new FormControl(null),
    especificaciones: new FormControl(null),
    tiempoVida: new FormControl(0, [Validators.required]),
    nombre: new FormControl(null, [Validators.required]),
    imagen: new FormControl(null, [Validators.required]),
    rutaFondo: new FormControl(null, [Validators.required]),
    precioPaquete1: new FormControl(0, [Validators.required]),
    precioPaquete6: new FormControl(0, [Validators.required]),
    precioPaquete12: new FormControl(0, [Validators.required]),
    precioPaquete24: new FormControl(0, [Validators.required]),
    ingredientesReceta: new FormArray([], [Validators.required]),
  });

  constructor(
    private readonly recetasService: RecetaService,
    private readonly alertasService: AlertasService,
    private readonly insumosService: InsumosService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.obtenerInsumos();
  }

  get f() {
    return this.recetaForm.controls;
  }

  get ingredientesReceta(): FormArray {
    return this.recetaForm.get('ingredientesReceta') as FormArray;
  }

  public show(id?: number) {
    this.recetaForm.reset();
    this.display = true;
    this.obtenerInsumos();
    if (id) {
      this.modal.header = 'Editar Receta';
      this.modificar = true;
      this.obtenerReceta(id);
    } else {
      this.modificar = false;
      this.insumosSeleccionados = [];
      this.insumos = [];
      this.modal.header = 'Nueva Receta';
    }
  }

  public ocultar() {
    this.display = false;
    this.recetaForm.reset();
    this.receta = undefined;
    this.ingredientesReceta.clear();
    this.reload.emit();
  }

  public guardar() {
    this.recetasService
      .crear(this.recetaForm.value)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.alertasService.showSuccess('Receta creada correctamente');
          this.ocultar();
        },
        error: (error: any) => {
          console.error(error);
          this.alertasService.showError(
            'Error al crear la receta: ' + error.error.message
          );
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
          this.alertasService.showError(
            'Error al actualizar la receta: ' + error.error.message
          );
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
          console.log('RECETA', data);
          this.recetaForm.patchValue(data);

          data.ingredientesReceta.forEach((ingrediente: any) => {
            this.ingredientesReceta.push(
              this.fb.group({
                id: ingrediente.id,
                nombre: ingrediente.nombre,
                unidadMedida: ingrediente.unidadMedida,
                cantidad: ingrediente.cantidad,
              })
            );
          });
          this.asignarIngredientes(data.ingredientesReceta);

          console.log('INGREDIENTES SELECCIONADOS', this.insumosSeleccionados);
          console.log('INGREDIENTES RECETA', this.ingredientesReceta.value);
        },
        error: (error: any) => {
          console.error(error);
          this.alertasService.showError('Error al obtener la receta');
        },
      });
  }

  // Método para agregar elementos al FormArray
  agregarIngrediente(insumo: any) {
    this.ingredientesReceta.push(
      this.fb.group({
        id: insumo.id,
        nombre: insumo.nombre,
        unidadMedida: insumo.unidadMedida,
        cantidad: 0,
      })
    );
  }

  eliminarIngrediente(index: number) {
    this.ingredientesReceta.removeAt(index);
  }

  public obtenerInsumos() {
    this.insumosService
      .obtener()
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          /* FILTRAMOS SOLO LOS INSUMOS ACTIVOS */

          this.insumos = data
            .filter((insumo: any) => insumo.activo)
            .map((insumo: any) => ({
              id: insumo.id,
              nombre: insumo.nombre,
              unidadMedida: insumo.unidadMedida,
            }));

          console.log('INSUMOS BD', this.insumos);
        },
        error: (error: any) => {
          this.alertasService.showError('Error al obtener los insumos');
          console.error(error);
        },
      });
  }

  onInsumosChange(event: any) {
    const selected = event.value;
    const current = this.recetaForm.get('ingredientesReceta') as FormArray;

    // Asegúrate de que el FormArray tenga controles antes de realizar cualquier operación
    if (!current) {
      setTimeout(() => this.onInsumosChange(event), 0);
      return;
    }

    // Agregar nuevos insumos seleccionados
    selected.forEach((insumo: any) => {
      if (
        !current.controls.find((ctrl) => ctrl.get('id')!.value === insumo.id)
      ) {
        this.agregarIngrediente(insumo);
      }
    });

    // Eliminar insumos deseleccionados
    for (let i = current.length - 1; i >= 0; i--) {
      const ingrediente = current.at(i);
      if (
        !selected.find(
          (insumo: any) => insumo.id === ingrediente.get('id')!.value
        )
      ) {
        current.removeAt(i);
      }
    }
  }

  calcularPrecios() {
    const precioPaquete1 = this.f['precioPaquete1'].value;

    this.f['precioPaquete6'].setValue(precioPaquete1 * 6);
    this.f['precioPaquete12'].setValue(precioPaquete1 * 12);
    this.f['precioPaquete24'].setValue(precioPaquete1 * 24);
  }

  asignarIngredientes(ingredientes: any) {
    this.insumosSeleccionados = ingredientes.map((ingrediente: any) => ({
      id: ingrediente.id,
      nombre: ingrediente.nombre,
      unidadMedida: ingrediente.unidadMedida,
    }));
  }
}
