import { Component } from '@angular/core';
import { RolesService } from '../../../../services/roles/roles.service';
import { MenuItem } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-roles-tabla',
  templateUrl: './roles-tabla.component.html',
  styleUrl: './roles-tabla.component.css',
})
export class RolesTablaComponent {
  public roles: any[] = [];
  public items: MenuItem[];
  constructor(
    private rolesService: RolesService,
    private alertasService: AlertasService
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

  ngOnInit() {
    console.log('RolesTablaComponent inicializado');
    this.obtenerRoles();
  }

  obtenerRoles() {
    this.rolesService.obtener().subscribe({
      next: (data: any) => {
        this.alertasService.showSuccess('Roles obtenidos correctamente');
        this.roles = data;
        console.log(data);
      },
      error: (error: any) => {
        this.alertasService.showError('Error al obtener los roles');
        console.error(error);
      },
    });
  }

  eliminar(id: number) {
    this.rolesService.eliminar(id).subscribe({
      next: (data: any) => {
        this.alertasService.showWarn('Rol eliminado correctamente');
        console.log(data);
        this.obtenerRoles();
      },
      error: (error: any) => {
        this.alertasService.showError('Error al eliminar el rol');
        console.error(error);
      },
    });
  }
}
