import { Component, inject } from '@angular/core';
import { CompartidoService } from '../../../services/compartido/compartido.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  _CompartidoService = inject(CompartidoService);
  public rol: string = '';
  public display: boolean = false;
  nombre: string = '';
  inicialesNombre: string = '';

  cerrarSesion() {
    this._CompartidoService.cerrarSesion();
  }

  ngOnInit(): void {
    this.nombre = this._CompartidoService.obtenerSesion().nombre;
    this.rol = this._CompartidoService.obtenerSesion().rol;
    console.log(this.rol);
    this.inicialesNombre = this.obtenerIniciales(this.nombre);
  }

  obtenerIniciales(nombre: string): string {
    const partes = nombre.split(' ');
    const iniciales = partes.map((parte) => parte.charAt(0)).join('');
    return iniciales.toUpperCase();
  }
}
