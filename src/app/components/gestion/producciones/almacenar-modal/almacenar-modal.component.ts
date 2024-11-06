import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ProduccionesService } from '../../../../services/producciones/producciones.service';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-almacenar-modal',
  templateUrl: './almacenar-modal.component.html',
  styleUrls: ['./almacenar-modal.component.css'],
})
export class AlmacenarModalComponent {
  @Output() reload: EventEmitter<any> = new EventEmitter();
  public display: boolean = false;
  public form: FormGroup = this.fb.group({
    idProduccion: new FormControl('', Validators.required),
    mensaje: new FormControl('',Validators.required),
    mermaLitros: new FormControl('',Validators.required),
    litrosFinales: new FormControl('',Validators.required),
    calcularMerma: new FormControl(false,Validators.required),
    produccionFallida: new FormControl(false,Validators.required),
  });
  public idProduccion: number = 0;

  constructor(
    private fb: FormBuilder,
    private produccionesService: ProduccionesService,
    private alertasService: AlertasService,
  ) {

    // Observa el cambio en el checkbox calcularMerma
    this.form.get('calcularMerma')?.valueChanges.subscribe((isCalcular) => {
      if (isCalcular) {
        this.form.get('mermaLitros')?.disable();
      } else {
        this.form.get('mermaLitros')?.enable();
      }
    });
  }

  show(id: number) {
    this.display = true;
    this.idProduccion = id;
    this.form.patchValue({ idProduccion: id });
  }

  hide() {
    this.display = false;
    this.reload.emit();
  }

  almacenar() {
    if (this.form.invalid) {
      this.alertasService.showWarn('Por favor completa todos los campos requeridos.');
      return;
    }

    const formData = { ...this.form.value }; // Clonamos el valor del formulario

    // Si calcularMerma está activado, eliminamos mermaLitros de formData
    if (formData.calcularMerma) {
      //quitar del objeto la propiedad mermaLitros
      delete formData.mermaLitros;
    }

    console.log('Formulario:', formData);
    this.produccionesService.almacenar(this.idProduccion, formData).subscribe({
      next: (data: any) => {
        console.log('Respuesta:', data);
        this.alertasService.showSuccess('Almacenado correctamente');
        this.hide();
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.alertasService.showWarn(error.error.message);
        console.error('Error al almacenar');
      },
    });
  }
}
