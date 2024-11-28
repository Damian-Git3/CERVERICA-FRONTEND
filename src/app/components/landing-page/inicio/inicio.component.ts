import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/productos/producto';
import { ProductosService } from '../../../services/productos/productos.service';
import { ActivatedRoute } from '@angular/router';
import { CompartidoService } from '../../../services/compartido/compartido.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  productosCarousel: Producto[] = [];

  responsiveOptions: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private _productosService: ProductosService,
    private _CompartidoService: CompartidoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['cerrarsesion'] === '1') {
        this._CompartidoService.cerrarSesion();
      }
    });

    this._productosService.obtenerProductosCarousel().subscribe({
      next: (productosCarouselResponse) => {
        this.productosCarousel = productosCarouselResponse;
      },
      error: (e) => {
        console.log(e);
      },
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
