import { Component, inject } from '@angular/core';
import { CompartidoService } from '../../../services/compartido/compartido.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  _CompartidoService = inject(CompartidoService);

  ngOnInit(): void {
    this._CompartidoService.actualizarTitulo('Inicio');
  }
}
