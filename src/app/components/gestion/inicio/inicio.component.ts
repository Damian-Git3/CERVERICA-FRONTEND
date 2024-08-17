import { Component, inject } from '@angular/core';
import { CompartidoService } from '../../../services/compartido/compartido.service';
import { GraficasService } from '../../../services/graficas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  _CompartidoService = inject(CompartidoService);
  _GraficasService = inject(GraficasService);

  datosNuevosClientesPorMes: any;
  datosVentasPorStatus: any;
  datosIngresosPorMes: any;
  datosProductosMasVendidos: any;
  datosPedidosPorMetodoPago: any;

  nuevosClientesPorMes: any[] = [];
  ventasPorEstatus: any[] = [];
  ingresosPorMes: any[] = [];
  productosMasVendidos: any[] = [];
  pedidosPorMetodoPago: any[] = [];

  ngOnInit(): void {
    this._CompartidoService.actualizarTitulo('Inicio');

    this.loadNuevosClientesPorMes();
    this.loadVentasPorEstatus();
    this.loadIngresosPorMes();
    this.loadProductosMasVendidos();
    this.loadPedidosPorMetodoPago();
  }

  loadNuevosClientesPorMes(): void {
    this._GraficasService.getNuevosClientesPorMes().subscribe((data) => {
      this.nuevosClientesPorMes = data;
      this.inicializarGraficaNuevosClientesPorMes();
    });
  }

  inicializarGraficaNuevosClientesPorMes() {
    const labels = this.nuevosClientesPorMes.map(
      (item) => `${item.mes}/${item.año}`
    );
    const data = this.nuevosClientesPorMes.map((item) => item.nuevosClientes);

    this.datosNuevosClientesPorMes = {
      labels: labels,
      datasets: [
        {
          label: 'Nuevos Clientes',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', // Color 1
            'rgba(54, 162, 235, 0.2)', // Color 2
            'rgba(255, 206, 86, 0.2)', // Color 3
            'rgba(75, 192, 192, 0.2)', // Color 4
          ],
          borderColor: [
            'rgb(255, 99, 132)', // Color 1
            'rgb(54, 162, 235)', // Color 2
            'rgb(255, 206, 86)', // Color 3
            'rgb(75, 192, 192)', // Color 4
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  loadVentasPorEstatus(): void {
    this._GraficasService.getVentasPorEstatus().subscribe((data) => {
      this.ventasPorEstatus = data;
      this.inicializarGraficaVentasPorStatus();
    });
  }

  inicializarGraficaVentasPorStatus() {
    const labels = this.ventasPorEstatus.map((item) => `${item.estatus}`);
    const data = this.ventasPorEstatus.map((item) => item.cantidad);

    this.datosVentasPorStatus = {
      labels: labels,
      datasets: [
        {
          label: 'Ventas por estatus',
          data: data,
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)', // Color 1
            'rgba(255, 159, 64, 0.2)', // Color 2
            'rgba(75, 192, 192, 0.2)', // Color 3
            'rgba(255, 99, 132, 0.2)', // Color 4
          ],
          borderColor: [
            'rgb(153, 102, 255)', // Color 1
            'rgb(255, 159, 64)', // Color 2
            'rgb(75, 192, 192)', // Color 3
            'rgb(255, 99, 132)', // Color 4
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  loadIngresosPorMes(): void {
    this._GraficasService.getIngresosPorMes().subscribe((data) => {
      this.ingresosPorMes = data;
      this.inicializarGraficaIngresosPorMes();
    });
  }

  inicializarGraficaIngresosPorMes() {
    const labels = this.ingresosPorMes.map((item) => `${item.mes}/${item.ano}`);
    const data = this.ingresosPorMes.map((item) => item.ingresosTotales);

    this.datosIngresosPorMes = {
      labels: labels,
      datasets: [
        {
          label: 'Ingresos por mes',
          data: data,
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)', // Color 1
            'rgba(54, 162, 235, 0.2)', // Color 2
            'rgba(255, 99, 132, 0.2)', // Color 3
            'rgba(75, 192, 192, 0.2)', // Color 4
          ],
          borderColor: [
            'rgb(255, 206, 86)', // Color 1
            'rgb(54, 162, 235)', // Color 2
            'rgb(255, 99, 132)', // Color 3
            'rgb(75, 192, 192)', // Color 4
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  loadProductosMasVendidos(): void {
    this._GraficasService.getProductosMasVendidos().subscribe((data) => {
      this.productosMasVendidos = data;
      this.inicializarGraficaProductosMasVendidos();
    });
  }

  inicializarGraficaProductosMasVendidos() {
    const labels = this.productosMasVendidos.map((item) => `${item.producto}`);
    const data = this.productosMasVendidos.map((item) => item.cantidadVendida);

    this.datosProductosMasVendidos = {
      labels: labels,
      datasets: [
        {
          label: 'Productos más vendidos',
          data: data,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)', // Color 1
            'rgba(153, 102, 255, 0.2)', // Color 2
            'rgba(255, 159, 64, 0.2)', // Color 3
            'rgba(255, 99, 132, 0.2)', // Color 4
          ],
          borderColor: [
            'rgb(75, 192, 192)', // Color 1
            'rgb(153, 102, 255)', // Color 2
            'rgb(255, 159, 64)', // Color 3
            'rgb(255, 99, 132)', // Color 4
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  loadPedidosPorMetodoPago(): void {
    this._GraficasService.getPedidosPorMetodoPago().subscribe((data) => {
      this.pedidosPorMetodoPago = data;
      this.inicializarGraficaPedidosPorMetodoPago();
    });
  }

  inicializarGraficaPedidosPorMetodoPago() {
    const labels = this.pedidosPorMetodoPago.map(
      (item) => `${item.metodoPago}`
    );
    const data = this.pedidosPorMetodoPago.map((item) => item.cantidad);

    this.datosPedidosPorMetodoPago = {
      labels: labels,
      datasets: [
        {
          label: 'Pedidos por método de pago',
          data: data,
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)', // Color 1
            'rgba(255, 159, 64, 0.2)', // Color 2
            'rgba(75, 192, 192, 0.2)', // Color 3
            'rgba(255, 99, 132, 0.2)', // Color 4
          ],
          borderColor: [
            'rgb(153, 102, 255)', // Color 1
            'rgb(255, 159, 64)', // Color 2
            'rgb(75, 192, 192)', // Color 3
            'rgb(255, 99, 132)', // Color 4
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
