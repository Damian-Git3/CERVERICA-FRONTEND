import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-producciones-tabla',
  templateUrl: './producciones-tabla.component.html',
  styleUrl: './producciones-tabla.component.css',
})
export class ProduccionesTablaComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
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
}
