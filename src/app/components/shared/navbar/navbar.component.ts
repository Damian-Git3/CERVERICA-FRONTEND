import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  opciones: MenuItem[] = [];
  constructor() {
    this.opciones = [
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        routerLink: '/clientes',
      },
      {
        label: 'Empleados',
        icon: 'pi pi-address-book',
        routerLink: '/empleados',
      },
      {
        label: 'Giphy',
        icon: 'pi pi-image',
        routerLink: '/giphy',
      },
      {
        label: 'Tareas',
        icon: 'pi pi-list',
        routerLink: '/tareas',
      },
    ];
  }

  ngOnInit() {
    console.log('NavbarComponent inicializado');
  }
}
