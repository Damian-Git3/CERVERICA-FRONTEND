import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InsumosService } from '../../../../services/insumos/insumos.service';
import { IInsumo } from '../../../../interfaces/insumo.interface';
import { catchError, finalize } from 'rxjs';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-insumos-modal',
  templateUrl: './insumos-modal.component.html',
  styleUrl: './insumos-modal.component.css',
})
export class InsumosModalComponent implements OnInit {
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  public display: boolean = false;
  public titulo: string = '';
  public labelBoton: string = '';
  public modificar: boolean = false;
  public unidadesMedida: any[] = ['KG', 'L', 'PZ'];

  insumoForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    unidadMedida: new FormControl(''),
    cantidadMaxima: new FormControl(''),
    cantidadMinima: new FormControl(''),
    costoUnitario: new FormControl({ value: '', disabled: true }),
    merma: new FormControl(''),
    activo: new FormControl(''),
  });

  constructor(private insumosService: InsumosService,
    private alertasService: AlertasService
  ) {}

  ngOnInit() {
    console.log('InsumosModalComponent inicializado');
  }

  get f() {
    return this.insumoForm.controls;
  }

  public show(id?: number) {
    this.display = true;

    if (id) {
      console.log(id);
      this.modificar = true;
      this.titulo = 'Editar Insumo';
      this.labelBoton = 'Actualizar';
      this.insumosService
        .obtenerPorId(id)
        .pipe(
          catchError((error) => {
            console.error(error);
            return error;
          })
        )
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.alertasService.showSuccess('Insumo obtenido correctamente');
            this.insumoForm.setValue(data);
          },
          error: (error: any) => {
            this.alertasService.showError('Error al obtener el insumo');
            console.error(error);
          },
        });
    } else {
      this.modificar = false;
      this.labelBoton = 'Guardar';
      this.titulo = 'Crear Insumo';
    }

    console.log(this.insumoForm.value);
  }

  public ocultar() {
    this.display = false;
    this.insumoForm.reset();
    this.reload.emit();
  }

  guardar() {
    this.insumosService
      .crear(this.insumoForm.value)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Insumo creado correctamente');
          console.log(data);
          this.ocultar();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al crear el insumo');
          console.error(error);
        },
      });
  }

  actualizar() {
    this.insumosService
      .modificar(this.f['id'].value, this.insumoForm.value)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Insumo actualizado correctamente');
          this.ocultar();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al actualizar el insumo');
          console.error(error);
        },
      });
  }
}
