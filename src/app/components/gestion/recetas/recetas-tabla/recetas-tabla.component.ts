import { Component, inject, OnInit } from '@angular/core';
import { RecetaService } from '../../../../services/receta/receta.service';
import { finalize } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { CompartidoService } from '../../../../services/compartido/compartido.service';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-recetas-tabla',
  templateUrl: './recetas-tabla.component.html',
  styleUrl: './recetas-tabla.component.css',
})
export class RecetasTablaComponent implements OnInit {
  public _CompartidoService = inject(CompartidoService);

  public recetas: any[] = [];
  public items: MenuItem[];
  public valorBuscado: string = '';
  constructor(
    private recetaService: RecetaService,
    private alertasService: AlertasService,
    private title: Title
  ) {
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

  public ngOnInit(): void {
    this.obtenerRecetas();
    this.title.setTitle('Recetas');
    this._CompartidoService.actualizarTitulo('Recetas');
  }

  obtenerRecetas() {
    this.recetaService
      .obtener()
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          this.recetas = data;
        },
        error: (error: any) => {
          this.alertasService.showError('Error al obtener las recetas');
          console.error(error);
        },
      });
  }

  activar(id: number) {
    this.recetaService
      .activar(id)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess(
            'Se desbloqueo correctamente la receta',
            'Receta desbloqueada'
          );
          this.obtenerRecetas();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al activar la receta');
        },
      });
  }

  desactivar(id: number) {
    this.recetaService
      .desactivar(id)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess(
            'Se bloqueo correctamente la receta',
            'Receta bloqueada'
          );
          this.obtenerRecetas();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al desactivar la receta');
        },
      });
  }

  eliminar(id: number) {
    this.recetaService
      .eliminar(id)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Eliminado');
          this.obtenerRecetas();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al eliminar');
        },
      });
  }
}
