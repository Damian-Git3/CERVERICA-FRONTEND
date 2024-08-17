import { Component, inject, OnInit } from '@angular/core';
import { IInsumo } from '../../../../interfaces/insumo.interface';
import { InsumosService } from '../../../../services/insumos/insumos.service';
import { finalize } from 'rxjs';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { CompartidoService } from '../../../../services/compartido/compartido.service';

@Component({
  selector: 'app-insumos-tabla',
  templateUrl: './insumos-tabla.component.html',
  styleUrl: './insumos-tabla.component.css',
})
export class InsumosTablaComponent implements OnInit {
  public insumos: IInsumo[] = [];
  public items: any[] = [];


  _CompartidoService = inject(CompartidoService);

  cargando: boolean = false;


  constructor(
    private insumosService: InsumosService,
    private alertasService: AlertasService
  ) {}

  ngOnInit() {
    this.obtenerInsumos();

    this._CompartidoService.actualizarTitulo('Insumos');
  }

  public obtenerInsumos() {
    this.cargando = true;

    this.insumosService
      .obtener()
      .pipe(finalize(() => (this.cargando = false)))
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
    this.insumosService
      .activar(id)
      .pipe(finalize(() => (this.cargando = false)))
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
    this.insumosService
      .desactivar(id)
      .pipe(finalize(() => (this.cargando = false)))
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
    this.insumosService
      .eliminar(id)
      .pipe(finalize(() => (this.cargando = false)))
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

  async confirmarEliminar(event: Event, id: number) {
    const confirmed = await this.alertasService.confirmarEliminacion(event);
    if (confirmed) {
      this.eliminar(id);
    }
  }
}
