import { Component, OnInit } from '@angular/core';
import { IInsumo } from '../../../../interfaces/insumo.interface';
import { InsumosService } from '../../../../services/insumos/insumos.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-insumos-tabla',
  templateUrl: './insumos-tabla.component.html',
  styleUrl: './insumos-tabla.component.css'
})
export class InsumosTablaComponent implements OnInit {

  public insumos: IInsumo[] = [];
  public items: any[] = [];

  constructor(
    private insumosService: InsumosService
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
      .pipe(finalize(() => {}))
      .subscribe((data: IInsumo[]) => {
        this.insumos = data;
      });
  }
}
