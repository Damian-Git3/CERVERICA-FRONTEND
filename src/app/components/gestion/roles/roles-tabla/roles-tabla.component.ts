import { Component, inject } from '@angular/core';
import { RolesService } from '../../../../services/roles/roles.service';
import { MenuItem } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { CompartidoService } from '../../../../services/compartido/compartido.service';

@Component({
  selector: 'app-roles-tabla',
  templateUrl: './roles-tabla.component.html',
  styleUrl: './roles-tabla.component.css',
})
export class RolesTablaComponent {
  public roles: any[] = [];
  public items: MenuItem[];

  _CompartidoService = inject(CompartidoService);
  constructor(
    private rolesService: RolesService,
    private alertasService: AlertasService,
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
    this.obtenerRoles();

    this._CompartidoService.actualizarTitulo('Roles');
  }

  obtenerRoles() {
    this.rolesService.obtener().subscribe({
      next: (data: any) => {
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
