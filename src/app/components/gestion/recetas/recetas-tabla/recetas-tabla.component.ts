import { Component, inject, OnInit } from '@angular/core';
import { RecetaService } from '../../../../services/receta/receta.service';
import { finalize } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { CompartidoService } from '../../../../services/compartido/compartido.service';
import { Producto } from '../../../../interfaces/productos/producto';

@Component({
  selector: 'app-recetas-tabla',
  templateUrl: './recetas-tabla.component.html',
  styleUrl: './recetas-tabla.component.css',
})
export class RecetasTablaComponent implements OnInit {
  public _CompartidoService = inject(CompartidoService);

  public recetas: any[] = [];
  public items: MenuItem[];
  constructor(private recetaService: RecetaService) {
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
  }

  obtenerRecetas() {
    this.recetaService
      .obtener(this._CompartidoService.obtenerSesion().token)
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data: any) => {
          this.recetas = data;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }
}
