import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { RecetaService } from '../../../../services/receta/receta.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recetas-modal-pasos',
  templateUrl: './recetas-modal-pasos.component.html',
  styleUrl: './recetas-modal-pasos.component.css'
})
export class RecetasModalPasosComponent implements OnInit {

  public form: FormGroup = this.fb.group({});
  public idReceta: number = 0;
  public display: boolean = false;
  public modificar: boolean = false;

  constructor(
    private recetasService: RecetaService,
    private alertasService: AlertasService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      pasos: this.fb.array([])
    });

  }

  get pasos() {
    return this.form.get('pasos') as FormArray;
  }

  ngOnInit(): void {
  }

  show(id: number) {
    this.idReceta = id;
    this.display = true;
    if (id) {
      this.modificar = true;
      this.obtenerPasos(id);
    }
  }

  obtenerPasos(id: number) {
    this.recetasService.obtenerPasos(id).subscribe({
      next: (pasos: any) => {
        console.log(pasos);
        this.pasos.clear();
        pasos.forEach((paso: any) => {
          this.pasos.push(this.fb.group({
            id: paso.id,
            descripcion: paso.descripcion,
            orden: { value: paso.orden, disabled: false },
            tiempo: paso.tiempo
          }));
        });
      },
      error: (e: any) => {
        console.log(e);

        this.alertasService.showError('Ocurrió un error al obtener los pasos de la receta');
      }
    });

  }

  crearPasos() {
    this.recetasService.crearPasos(this.idReceta, this.pasos.value).subscribe({
      next: (response: any) => {
        this.alertasService.showSuccess('Pasos de la receta creados correctamente');
        console.log(response);
      },
      error: (e: any) => {
        console.log(e);

        this.alertasService.showError('Ocurrió un error al crear los pasos de la receta');
      }
    });
  }

  hide() {
    this.display = false;
    this.modificar = false
    this.form.reset();
    this.idReceta = 0;
  }

  modicarPasos() {
    console.log(this.pasos.value);
    this.recetasService.modificarPasos(this.idReceta, this.pasos.value).subscribe({
      next: (response: any) => {
        this.alertasService.showSuccess('Pasos de la receta modificados correctamente');
        this.hide();
        console.log(response);
      },
      error: (e: any) => {
        console.log(e);

        this.alertasService.showError('Ocurrió un error al modificar los pasos de la receta');
      }
    });
  }

  agregarNuevoPaso() {
    this.pasos.push(this.fb.group({
      descripcion: '',
      orden: this.pasos.length + 1,
      tiempo: 0
    }));
  }

  eliminarPaso(index: number) {
    this.pasos.removeAt(index);
  }

}
