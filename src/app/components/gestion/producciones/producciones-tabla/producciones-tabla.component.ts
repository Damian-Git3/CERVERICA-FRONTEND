import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { ProduccionesService } from '../../../../services/producciones/producciones.service';
import { CompartidoService } from '../../../../services/compartido/compartido.service';

@Component({
  selector: 'app-producciones-tabla',
  templateUrl: './producciones-tabla.component.html',
  styleUrl: './producciones-tabla.component.css',
})
export class ProduccionesTablaComponent implements OnInit {
  items: MenuItem[] | undefined;
  public usuariosOperador: any[] = [];
  public producciones: any[] = [];

  _CompartidoService = inject(CompartidoService);

  constructor(
    private usuariosService: UsuariosService,
    private alertasService: AlertasService,
    private produccionesService: ProduccionesService
  ) {}

  ngOnInit() {
    this.obtenerProducciones();
  }

  obtenerProducciones() {
    this.produccionesService.obtener().subscribe({
      next: (data: any) => {
        this.producciones = data;
        console.log('Producciones obtenidas', this.producciones);
      },
      error: (error: any) => {
        console.error('Error al obtener las producciones');
      },
    });
  }
}
