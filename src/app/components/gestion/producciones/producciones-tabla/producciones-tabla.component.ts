import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CompartidoService } from '../../../../services/compartido/compartido.service';

@Component({
  selector: 'app-producciones-tabla',
  templateUrl: './producciones-tabla.component.html',
  styleUrl: './producciones-tabla.component.css',
})
export class ProduccionesTablaComponent implements OnInit {
  items: MenuItem[] | undefined;
  _CompartidoService = inject(CompartidoService);

  ngOnInit() {
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

    this._CompartidoService.actualizarTitulo('Producciones');
  }
}
