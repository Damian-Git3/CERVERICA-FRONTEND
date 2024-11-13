import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { ProduccionesService } from '../../../../services/producciones/producciones.service';
import { CompartidoService } from '../../../../services/compartido/compartido.service';
import { SesionDTO } from '../../../../interfaces/usuario/sesion-dto';
import { Title } from '@angular/platform-browser';
import {} from '@angular/animations';
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

  _CompartidoService = inject(CompartidoService);

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly alertasService: AlertasService,
    private readonly produccionesService: ProduccionesService,
    private readonly compartidoService: CompartidoService,
    private readonly title: Title
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

    this._CompartidoService.actualizarTitulo('Producciones');
    this.title.setTitle('Producciones');
    this.usuario = this.compartidoService.obtenerSesion();
    console.log('Usuario:', this.usuario);
  }

  ngOnInit() {
    this.obtenerProducciones();
    this.obtenerOperadores();
  }

  obtenerOperadores() {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (res: any) => {
        this.usuariosOperador = res
          .filter((usuario: any) => usuario.rol === 'Operador')
          .map((usuario: any) => {
            return {
              nombre: usuario.nombre,
              idUsuario: usuario.id,
            };
          });
      },
      error: (error: any) => {
        console.error('Error al obtener los operadores', error);
      },
    });
  }

  comenzarProduccionMayorista(idProduccion: number) {
    this.produccionesService
      .comenzarProduccionMayorista(idProduccion)
      .subscribe({
        next: (res: any) => {
          this.alertasService.showSuccess(res.message);
          this.obtenerProducciones();
        },
        error: (error: any) => {
          if (error.status === 400) {
            this.alertasService.showError(error.error.message);
          }
        },
      });
  }

  obtenerProducciones() {
    this.produccionesService.obtener().subscribe({
      next: (res: any) => {
        if (this.usuario.rol === 'Operador') {
          this.producciones = res.filter(
            (produccion: any) => produccion.idUsuario === this.usuario.idUsuario
          );
        } else {
          this.producciones = res;
        }

        console.log('Producciones obtenidas', this.producciones);
      },
      error: (error: any) => {
        console.error('Error al obtener las producciones', error);
      },
    });
  }
  eliminar(id: number) {
    this.produccionesService.eliminar(id).subscribe({
      next: (res: any) => {
        console.log('Produccion eliminada', res);
        this.alertasService.showSuccess('Produccion eliminada');
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al eliminar la produccion', error);
        this.alertasService.showSuccess('Error al eliminar la produccion');
      },
    });
  }

  aceptar(id: number) {
    this.produccionesService.aceptarSolicutud(id).subscribe({
      next: (res: any) => {
        console.log('Produccion aceptada', res);
        this.alertasService.showSuccess('Produccion aceptada');
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al aceptar la produccion', error);
        this.alertasService.showError('Error al aceptar la produccion');
      },
    });
  }

  rechazar() {
    this.produccionesService
      .rechazarSolicitud(this.idSeleccionado, this.motivo)
      .subscribe({
        next: (res: any) => {
          console.log('Produccion rechazada', res);
          this.alertasService.showSuccess('Produccion rechazada');
          this.displayMensaje = false;
          this.rechazarBtn = false;
          this.motivo = '';
          this.obtenerProducciones();
        },
        error: (error: any) => {
          console.error('Error al rechazar la produccion', error);
          this.alertasService.showError('Error al rechazar la produccion');
        },
      });
  }

  posponer() {
    this.produccionesService
      .posponerSolicitud(this.idSeleccionado, this.motivo)
      .subscribe({
        next: (res: any) => {
          console.log('Produccion pospuesta', res);
          this.alertasService.showSuccess('Produccion pospuesta');
          this.displayMensaje = false;
          this.posponerBtn = false;
          this.motivo = '';
          this.obtenerProducciones();
        },
        error: (error: any) => {
          console.error('Error al posponer la produccion', error);
          this.alertasService.showError('Error al posponer la produccion');
        },
      });
  }

  reenviar(id: number) {
    this.produccionesService.resolicitar(id).subscribe({
      next: (res: any) => {
        console.log('Produccion resolicitada', res);
        this.alertasService.showSuccess('Produccion resolicitada');
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al resolicitar la produccion', error);
        this.alertasService.showError('Error al resolicitar la produccion');
      },
    });
  }

  almacenar(id: number) {
    this.produccionesService.almacenar(id, {}).subscribe({
      next: (res: any) => {
        console.log('Produccion almacenada', res);
        this.alertasService.showSuccess('Produccion almacenada');
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al almacenar la produccion', error);
        this.alertasService.showError('Error al almacenar la produccion');
      },
    });
  }

  asignarUsuario() {
    this.produccionesService
      .asignarOperador(this.idSeleccionado, this.idUsuarioSeleccionado)
      .subscribe({
        next: (res: any) => {
          console.log('Usuario asignado', res);
          this.alertasService.showSuccess('Usuario asignado');
          this.displayAsignarUsuario = false;
          this.obtenerProducciones();
        },
        error: (error: any) => {
          console.error('Error al asignar el usuario', error);
          this.alertasService.showError('Error al asignar el usuario');
        },
      });
  }

  avanzarPaso(id: number) {
    this.produccionesService.avanzarPaso({ idProduccion: id }).subscribe({
      next: (res: any) => {
        console.log('Paso avanzado', res);
        this.alertasService.showSuccess('Paso avanzado');
        this.obtenerProducciones();
      },
      error: (error: any) => {
        console.error('Error al avanzar el paso', error);
        this.alertasService.showError('Error al avanzar el paso');
      },
    });
  }
}
