import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  public insumosFijos: any[] = [];

  public insumosSeleccionados: any[] = [];

  public recetaForm: FormGroup = this.fb.group({
    id: new FormControl({ value: '', disabled: true }),
    litrosEstimados: new FormControl(0),
    descripcion: new FormControl(''),
    especificaciones: new FormControl({ value: null, disabled: false }),
    tiempoVida: new FormControl(0),
    nombre: new FormControl(''),
    imagen: new FormControl(''),
    rutaFondo: new FormControl(''),
    precioPaquete1: new FormControl(0),
    precioPaquete6: new FormControl(0),
    precioPaquete12: new FormControl(0),
    precioPaquete24: new FormControl(0),
    ingredientesReceta: this.fb.array([]),
  });

  constructor(
    private recetasService: RecetaService,
    private alertasService: AlertasService,
    private insumosService: InsumosService,
    private fb: FormBuilder
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
    this.reload.emit();
  }

  public guardar() {
    this.recetasService
      .crear(this.recetaForm.value)
      .pipe(finalize(() => this.ocultar()))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.alertasService.showSuccess('Receta creada correctamente');
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
          this.f['tiempoVida'].setValue(data.tiempoVida);

          this.insumosSeleccionados = [];

          data.ingredientesReceta.forEach((ingrediente: any) => {
            if (!ingrediente.fijo) {
              let insumo = {
                id: ingrediente.id,
                nombre: ingrediente.nombre,
                cantidad: ingrediente.cantidad,
                unidadMedida: ingrediente.unidadMedida,
                fijo: ingrediente.fijo,
              };

              this.insumosSeleccionados.push(insumo);
            }
          });

          /* CARGAMOS LOS INGREDIENTES DE LA RECETA */
          this.ingredientesReceta.clear();

          data.ingredientesReceta.forEach((ingrediente: any) => {
            if (!ingrediente.fijo) {
              this.ingredientesReceta.push(
                this.fb.group({
                  id: [ingrediente.id],
                  nombre: [ingrediente.nombre],
                  cantidad: [ingrediente.cantidad],
                  unidadMedida: [ingrediente.unidadMedida],
                  fijo: [ingrediente.fijo],
                })
              );
            } else {
              this.ingredientesReceta.push(
                this.fb.group({
                  id: [ingrediente.id],
                  nombre: [ingrediente.nombre],
                  cantidad: [ingrediente.cantidad],
                  unidadMedida: [ingrediente.unidadMedida],
                  fijo: [ingrediente.fijo],
                })
              );
            }
          });
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
        id: [insumo.id],
        nombre: [insumo.nombre],
        unidadMedida: [insumo.unidadMedida],
        cantidad: [''],
        fijo: [insumo.fijo],
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
          this.insumosFijos = data.filter((insumo: any) => insumo.fijo);

          this.insumos = data
            .filter((insumo: any) => insumo.activo && !insumo.fijo)
            .map((insumo: any) => ({
              id: insumo.id,
              nombre: insumo.nombre,
              unidadMedida: insumo.unidadMedida,
              fijo: insumo.fijo,
            }));

          this.insumosFijos.forEach((insumo: any) => {
            this.agregarIngrediente(insumo);
          });
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

    // Añadir los insumos seleccionados que aún no estén en el FormArray
    selected.forEach((insumo: any) => {
      if (
        !current.controls.find(
          (ctrl) => ctrl.get('nombre')!.value === insumo.nombre
        )
      ) {
        this.agregarIngrediente(insumo);
      }
    });

    // Eliminar los insumos que no estén seleccionados, pero dejar los fijos
    for (let i = current.length - 1; i >= 0; i--) {
      const ingrediente = current.at(i);

      // Revisar si el ingrediente es fijo
      const esFijo = ingrediente.get('fijo')!.value;
      if (!esFijo) {
        // Si no es fijo, eliminarlo si no está en los insumos seleccionados
        if (
          !selected.find(
            (insumo: any) => insumo.nombre === ingrediente.get('nombre')!.value
          )
        ) {
          current.removeAt(i);
        }
      }
    }
  }
}
