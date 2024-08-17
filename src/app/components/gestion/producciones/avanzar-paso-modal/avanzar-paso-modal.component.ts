import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProduccionesService } from '../../../../services/producciones/producciones.service';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-avanzar-paso-modal',
  templateUrl: './avanzar-paso-modal.component.html',
  styleUrl: './avanzar-paso-modal.component.css',
})
export class AvanzarPasoModalComponent {
  public display: boolean = false;
  public form: FormGroup = this.fb.group({
    idProduccion: new FormControl(''),
    mensaje: new FormControl(''),
    mermaLitros: new FormControl(''),
  });
  public idProduccion: number = 0;

  constructor(
    private fb: FormBuilder,
    private produccionesService: ProduccionesService,
    private alertasService: AlertasService
  ) {}

  show(id: number) {
    this.display = true;
    this.idProduccion = id;
    this.form.patchValue({ idProduccion: id });
  }

  hide() {
    this.display = false;
  }

  avanzarPaso() {
    console.log('Formulario:', this.form.value);
    this.produccionesService.avanzarPaso(this.form.value).subscribe({
      next: (data: any) => {
        console.log('Respuesta:', data);
        this.alertasService.showSuccess('Paso avanzado correctamente');
        this.hide();
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.alertasService.showWarn
        (error.error.message);
        console.error('Error al avanzar paso');
      },
    });
  }
}
