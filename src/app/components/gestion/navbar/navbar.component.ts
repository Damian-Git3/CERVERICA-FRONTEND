import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CompartidoService } from '../../../services/compartido/compartido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  opciones: MenuItem[] = [];
  _CompartidoService = inject(CompartidoService);
  _Router = inject(Router);

  constructor() {
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
      },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => {
          this._CompartidoService.cerrarSesion();
        },
      },
    ];
  }

  ngOnInit() {
  }
}
