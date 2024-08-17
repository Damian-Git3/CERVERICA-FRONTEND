import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../../services/proveedores/proveedores.service';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-proveedores-tabla',
  templateUrl: './proveedores-tabla.component.html',
  styleUrl: './proveedores-tabla.component.css',
})
export class ProveedoresTablaComponent implements OnInit {

  public proveedores: any[] = [];
  public items: any[] = [];

  constructor(
    private proveedoresService: ProveedoresService,
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

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.proveedoresService.obtener()
      .pipe(finalize(() => { }))
      .subscribe({
        next: (data: any) => {
          this.proveedores = data;
        },
        error: (error: any) => {
          this.alertasService.showError('Error al obtener los proveedores');
        },
      });
  }

  activar(id: number) {
    this.proveedoresService.activar(id)
      .pipe(finalize(() => { }))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Proveedor activado correctamente');
          this.obtenerProveedores();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al activar el proveedor');
        },
      });
  }

  desactivar(id: number) {
    this.proveedoresService.desactivar(id)
      .pipe(finalize(() => { }))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Proveedor desactivado correctamente');
          this.obtenerProveedores();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al desactivar el proveedor');
        },
      });
  }

  eliminar(id: number) {
    this.proveedoresService.eliminar(id)
      .pipe(finalize(() => { }))
      .subscribe({
        next: (data: any) => {
          this.alertasService.showSuccess('Proveedor eliminado correctamente');
          this.obtenerProveedores();
        },
        error: (error: any) => {
          this.alertasService.showError('Error al eliminar el proveedor');
        },
      });
  }
}
