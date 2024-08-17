import { inject, Component } from '@angular/core';
import { finalize } from 'rxjs';
import { LotesInsumoService } from '../../../../services/lotes-insumo/lotes-insumo.service';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { LoteInsumoDTO } from '../../../../interfaces/lotes-insumo/lote-insumo-dto';
import { CompartidoService } from '../../../../services/compartido/compartido.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
})
export class TablaComponent {
  _LotesInsumoService = inject(LotesInsumoService);
  _AlertasService = inject(AlertasService);
  _CompartidoService = inject(CompartidoService);

  lotesInsumo: LoteInsumoDTO[] = [];
  lotesInsumoFiltrados: LoteInsumoDTO[] = [];
  cargando: boolean = false;
  obteniendoTodos: boolean = false;

  ngOnInit(): void {
    this.obtenerLotesInsumo();

    this._CompartidoService.actualizarTitulo('Lotes insumo');
  }

  public obtenerTodosLotesInsumos() {
    this.cargando = true;
    this.obteniendoTodos = true;

    this._LotesInsumoService
      .obtenerLotesInsumoTodos()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (lotesInsumo: LoteInsumoDTO[]) => {
          this.lotesInsumo = lotesInsumo;
          this.lotesInsumoFiltrados = lotesInsumo;
        },
        error: (error: any) => {
          this._AlertasService.showError(
            'No se pudo obtener los lotes insumo, intenta nuevamente',
            'Ocurrió un problema'
          );
          console.error(error);
        },
      });
  }

  public obtenerLotesInsumo() {
    this.cargando = true;
    this.obteniendoTodos = false;

    this._LotesInsumoService
      .obtenerLotesInsumo()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (lotesInsumo: LoteInsumoDTO[]) => {
          this.lotesInsumo = lotesInsumo;
          this.lotesInsumoFiltrados = lotesInsumo;

          console.log(lotesInsumo);
        },
        error: (error: any) => {
          this._AlertasService.showError(
            'No se pudo obtener los lotes insumo, intenta nuevamente',
            'Ocurrió un problema'
          );
          console.error(error);
        },
      });
  }

  filtrarLotesInsumo(event: any) {
    const query = event.target.value.toLowerCase();
    this.lotesInsumoFiltrados = this.lotesInsumo.filter(
      (loteInsumo) =>
        loteInsumo.proveedor.nombreContacto
          .toString()
          .toLowerCase()
          .includes(query) ||
        loteInsumo.insumo.nombre.toString().toLowerCase().includes(query) ||
        loteInsumo.usuario.fullName.toString().toLowerCase().includes(query) ||
        loteInsumo.fechaCaducidad.toString().toLowerCase().includes(query) ||
        loteInsumo.cantidad.toString().toLowerCase().includes(query) ||
        loteInsumo.fechaCompra.toString().toLowerCase().includes(query) ||
        loteInsumo.caducado.toString().toLowerCase().includes(query) ||
        loteInsumo.precioUnidad.toString().toLowerCase().includes(query) ||
        loteInsumo.montoCompra.toString().toLowerCase().includes(query)
    );
  }

  eliminar(id: number) {
    this.cargando = true;

    this._LotesInsumoService
      .eliminarLoteInsumo(id)
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: () => {
          this._AlertasService.showSuccess(
            'Lote insumo eliminado correctamente',
            'Éxito'
          );
          this.obtenerLotesInsumo();
        },
        error: (error: any) => {
          this._AlertasService.showError(
            'No se pudo eliminar el lote insumo, intenta nuevamente',
            'Ocurrió un problema'
          );
          console.error(error);
        },
      });
  }

  async confirmarEliminar(event: Event, id: number) {
    console.log("Confirmando eliminacion");
    

    const confirmed = await this._AlertasService.confirmarEliminacion(event);
    if (confirmed) {
      this.eliminar(id);
    }
  }
}
