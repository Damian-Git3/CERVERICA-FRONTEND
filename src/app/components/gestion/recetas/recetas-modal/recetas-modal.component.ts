import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { IReceta } from '../../../../interfaces/receta.interface';
import { RecetaService } from '../../../../services/receta/receta.service';

@Component({
  selector: 'app-recetas-modal',
  templateUrl: './recetas-modal.component.html',
  styleUrl: './recetas-modal.component.css',
})
export class RecetasModalComponent implements OnInit {
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  public display: boolean = false;
  public receta: IReceta | undefined;
  public titulo: string = '';
  public labelBoton: string = '';
  public modificar: boolean = false;

  public recetaForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    litrosEstimados: new FormControl(''),
    descripcion: new FormControl(''),
    especificaciones: new FormControl(''),
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

  constructor(private recetasService: RecetaService) {}

  ngOnInit() {
    console.log('RecetasModalComponent inicializado');
  }

  get f() {
    return this.recetaForm.controls;
  }

  public show(receta?: IReceta | undefined) {
    this.display = true;

    if (receta) {
      console.log(receta);
      this.modificar = true;
      this.titulo = 'Editar Receta';
      this.labelBoton = 'Actualizar';
      this.receta = receta;
      this.recetaForm.setValue(receta);
    } else {
      console.log(receta);
      this.modificar = false;
      this.labelBoton = 'Guardar';
      this.titulo = 'Crear Receta';
    }

    console.log(this.recetaForm.value);
  }

  public ocultar() {
    this.display = false;
    this.recetaForm.reset();
    this.receta = undefined;
    this.reload.emit();
  }

  public guardar() {
    // if (this.recetaForm.invalid) {
    //   return;
    // }

    this.recetasService
      .crear(this.recetaForm.value)
      .pipe(finalize(() => this.ocultar()))
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
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
          console.log(data);
          this.ocultar();
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }
}
