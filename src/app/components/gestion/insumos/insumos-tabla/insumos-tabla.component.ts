import { Component, OnInit } from '@angular/core';
import { IInsumo } from '../../../../interfaces/insumo.interface';
import { InsumosService } from '../../../../services/insumos/insumos.service';
import { finalize } from 'rxjs';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-insumos-tabla',
  templateUrl: './insumos-tabla.component.html',
  styleUrl: './insumos-tabla.component.css'
})
export class InsumosTablaComponent implements OnInit {

  public insumos: IInsumo[] = [];
  public items: any[] = [];

  constructor(
    private insumosService: InsumosService,
    private alertasService: AlertasService
  ) {
    console.log('ProduccionesTablaComponent inicializado');
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ];
  }

  ngOnInit() {
    this.obtenerInsumos();
  }

  public obtenerInsumos() {
    this.insumosService
      .obtener()
      .pipe(finalize(() => { }))
      .subscribe({
        next: (data: any) => {
          this.insumos = data;
        },
        error: (error: any) => {
          this.alertasService.showError('Error al obtener los insumos');
          console.error(error);
        },
      });
  }

  activar(id: number) {
    this.insumosService.activar(id)
      .pipe(finalize(() => { }))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Insumo activado correctamente');
          this.obtenerInsumos();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al activar el insumo');
          console.error(error);
        },
      });
  }

  desactivar(id: number) {
    this.insumosService.desactivar(id)
      .pipe(finalize(() => { }))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Insumo desactivado correctamente');
          this.obtenerInsumos();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al desactivar el insumo');
          console.error(error);
        },
      });
  }

  eliminar(id: number) {
    this.insumosService.eliminar(id)
      .pipe(finalize(() => { }))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Insumo eliminado correctamente');
          this.obtenerInsumos();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al eliminar el insumo');
          console.error(error);
        },
      });
  }
}
