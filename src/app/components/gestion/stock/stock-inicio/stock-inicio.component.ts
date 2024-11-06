import { Component, inject, OnInit } from '@angular/core';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';
import { CompartidoService } from '../../../../services/compartido/compartido.service';
import { ProductosService } from '../../../../services/productos/productos.service';
import { Producto } from '../../../../interfaces/productos/producto';
import { RecetaService } from '../../../../services/receta/receta.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-stock-inicio',
  templateUrl: './stock-inicio.component.html',
  styleUrl: './stock-inicio.component.css'
})
export class StockInicioComponent implements OnInit {

  public items: any[] = [];
  productosCarousel: Producto[] = [];
  productosCarouselFiltrados: Producto[] = [];
  responsiveOptions: any[] | undefined;
  _CompartidoService = inject(CompartidoService);
  cargando: boolean = false;
  searchTerm: string = '';

  constructor(
    private alertasService: AlertasService,
    private _productosService: ProductosService,
    private _recetasService: RecetaService,
    private title: Title
  ) {}

  ngOnInit() {
    this.obtenerProductos();
    this.title.setTitle('Stock');
    this._CompartidoService.actualizarTitulo('Stock');
  }

  applyFilters(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    this.productosCarouselFiltrados = this.productosCarousel.filter(producto =>
      producto.nombre.toLowerCase().includes(searchTermLower) ||
      producto.especificaciones.toLowerCase().includes(searchTermLower) ||
      producto.cantidadEnStock.toString().toLowerCase().includes(searchTermLower)
    );
  }

  public obtenerProductos() {
    this._recetasService.obtenerRecetasLanding().subscribe({
      next: (productosCarouselResponse) => {
        this.productosCarousel = productosCarouselResponse;
        this.productosCarouselFiltrados = productosCarouselResponse;
        console.log(this.productosCarousel)
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
