import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { ProduccionesService } from '../../../../services/producciones/producciones.service';
import { CompartidoService } from '../../../../services/compartido/compartido.service';
import { SesionDTO } from '../../../../interfaces/usuario/sesion-dto';

@Component({
  selector: 'app-producciones-tabla',
  templateUrl: './producciones-tabla.component.html',
  styleUrl: './producciones-tabla.component.css',
})
export class ProduccionesTablaComponent implements OnInit {
  items: MenuItem[] | undefined;
  public usuariosOperador: any[] = [];
  public producciones: any[] = [];
  public tipoUsuario: string = '';
  public usuario: SesionDTO;
  public displayMensaje: boolean = false;
  public displayAsignarUsuario: boolean = false;
  public motivo: string = '';
  public rechazarBtn: boolean = false;
  public posponerBtn: boolean = false;
  public idSeleccionado: number = 0;
  public idUsuarioSeleccionado: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private alertasService: AlertasService,
    private produccionesService: ProduccionesService,
    private compartidoService: CompartidoService
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
    this.usuario = this.compartidoService.obtenerSesion();
    console.log('Usuario:', this.usuario);
  }

  ngOnInit() {
    console.log('ProduccionesTablaComponent inicializado');
    this.obtenerProducciones();
    this.obtenerOperadores();
  }

  obtenerOperadores() {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (data: any) => {
        this.usuariosOperador = data
          .filter((usuario: any) => usuario.rol === 'Operador')
          .map((usuario: any) => {
            return {
              nombre: usuario.nombre,
              idUsuario: usuario.id,
            };
          });
      },
      error: (error: any) => {
        console.error('Error al obtener los usuarios operador');
      },
    });
  }

  obtenerProducciones() {
    this.produccionesService.obtener().subscribe({
      next: (data: any) => {

        if (this.usuario.rol === 'Operador') {
          this.producciones = data.filter(
            (produccion: any) => produccion.idUsuario === this.usuario.idUsuario
          );
        } else {
          this.producciones = data;
        }


        console.log('Producciones obtenidas', this.producciones);
      },
      error: (error: any) => {
        console.error('Error al obtener las producciones');
      },
    });
  }

  eliminar(id: number) {
    this.produccionesService.eliminar(id).subscribe({
      next: (data: any) => {
        console.log('Produccion eliminada');
        this.alertasService.showSuccess('Produccion eliminada');
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al eliminar la produccion');
        this.alertasService.showSuccess('Error al eliminar la produccion');
      },
    });
  }

  aceptar(id: number) {
    this.produccionesService.aceptarSolicutud(id).subscribe({
      next: (data: any) => {
        console.log('Produccion aceptada');
        this.alertasService.showSuccess('Produccion aceptada');
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al aceptar la produccion');
        this.alertasService.showError('Error al aceptar la produccion');
      },
    });
  }

  rechazar() {
    this.produccionesService.rechazarSolicitud(this.idSeleccionado, this.motivo).subscribe({
      next: (data: any) => {
        console.log('Produccion rechazada');
        this.alertasService.showSuccess('Produccion rechazada');
        this.displayMensaje = false;
        this.rechazarBtn = false;
        this.motivo = '';
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al rechazar la produccion');
        this.alertasService.showError('Error al rechazar la produccion');
      },
    });
  }

  posponer() {
    this.produccionesService.posponerSolicitud(this.idSeleccionado, this.motivo).subscribe({
      next: (data: any) => {
        console.log('Produccion pospuesta');
        this.alertasService.showSuccess('Produccion pospuesta');
        this.displayMensaje = false;
        this.posponerBtn = false;
        this.motivo = '';
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al posponer la produccion');
        this.alertasService.showError('Error al posponer la produccion');
      },
    });
  }

  reenviar(id: number) {
    this.produccionesService.resolicitar(id).subscribe({
      next: (data: any) => {
        console.log('Produccion resolicitada');
        this.alertasService.showSuccess('Produccion resolicitada');
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al resolicitar la produccion');
        this.alertasService.showError('Error al resolicitar la produccion');
      },
    });
  }

  almacenar(id: number) {
    this.produccionesService.almacenar(id, {}).subscribe({
      next: (data: any) => {
        console.log('Produccion almacenada');
        this.alertasService.showSuccess('Produccion almacenada');
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al almacenar la produccion');
        this.alertasService.showError('Error al almacenar la produccion');
      },
    });
  }

  asignarUsuario() {
    this.produccionesService.asignarOperador(this.idSeleccionado, this.idUsuarioSeleccionado)
      .subscribe({
        next: (data: any) => {
          console.log('Usuario asignado');
          this.alertasService.showSuccess('Usuario asignado');
          this.displayAsignarUsuario = false;
          this.obtenerProducciones();
        },
        error: (error: any) => {
          console.error('Error al asignar el usuario');
          this.alertasService.showError('Error al asignar el usuario');
        },
      });

  }

  avanzarPaso(id: number) {
    this.produccionesService.avanzarPaso({ idProduccion: id }).subscribe({
      next: (data: any) => {
        console.log('Paso avanzado');
        this.alertasService.showSuccess('Paso avanzado');
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al avanzar el paso');
        this.alertasService.showError('Error al avanzar el paso');
      },
    });
  }

}
