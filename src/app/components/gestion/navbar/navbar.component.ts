import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  opciones: MenuItem[] = [];
  constructor(
    
  ) {
    this.opciones = [
      {
        label: 'Usuarios',
        icon: 'fa-solid fa-user',
        routerLink: '/clientes',
      },
      {
        label: 'Empleados',
        icon: 'fa-solid fa-users',
        routerLink: '/empleados',
      },
      {
        label: 'Producciones',
        icon: 'pi pi-list',
        routerLink: '/producciones',
      }
    ];
  }

  ngOnInit() {
    console.log('NavbarComponent inicializado');
  }
}
