import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/productos/producto';
import { ProductosService } from '../../../services/productos/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  productosCarousel: Producto[] = [];

  responsiveOptions: any[] | undefined;

  constructor(private _productosService: ProductosService) {}

  ngOnInit(): void {
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
