import { Component, OnInit } from '@angular/core';
import { ProduccionesService } from '../../../../services/producciones/producciones.service';

@Component({
  selector: 'app-pasos-modal',
  templateUrl: './pasos-modal.component.html',
  styleUrl: './pasos-modal.component.css'
})
export class PasosModalComponent implements OnInit {
  public display: boolean = false;
  public produccion: any = {};
  public receta: any = {};
  public pasos: any[] = [];
  public pasoActual: any = {};


  constructor(
    private produccionesService: ProduccionesService
  ) { }

  ngOnInit() {
    console.log('PasosModalComponent inicializado');
  }

  show(id: number) {
    this.display = true;
    if (id) {
      this.produccionesService.obtenerPorId(id).subscribe({
        next: (data: any) => {
          this.produccion = data;
          console.log('Produccion:', this.produccion.pasoActual);
          this.receta = data.receta
          this.pasos = this.produccion.pasosReceta;
          this.pasoActual = this.pasos[this.produccion.pasoActual];
          console.log('Produccion:', data);
          console.log('Receta:', this.receta);
          console.log('Pasos:', this.pasos);
        },
        error: (error: any) => {
          console.error('Error al obtener la produccion');
        },
      });
    }
  }

  hide() {
    this.display = false;
  }
}
