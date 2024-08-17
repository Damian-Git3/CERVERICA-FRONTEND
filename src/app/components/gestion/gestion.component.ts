import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompartidoService } from '../../services/compartido/compartido.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css'],
})
export class GestionComponent implements OnInit {
  titulo: string = 'Inicio';

  _Router = inject(Router);
  _CompartidoService = inject(CompartidoService);

  ngOnInit() {
    this._CompartidoService.TituloModulo.subscribe((tituloModulo) => {
      this.titulo = tituloModulo;
    });
  }
}
