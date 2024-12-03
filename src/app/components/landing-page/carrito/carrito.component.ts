import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CompartidoService } from '../../../services/compartido/compartido.service';
import { CarritoService } from '../../../services/carrito/carrito.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentasService } from '../../../services/ventas/ventas.service';
import { ProductoCarrito } from '../../../interfaces/carrito/producto-carrito';
import { CrearVentaDTO } from '../../../interfaces/ventas/crear-venta-dto';
import { DetalleVentaDTO } from '../../../interfaces/ventas/detalle-venta-dto';
import { VentaDTO } from '../../../interfaces/ventas/venta-dto';
import { ProductosService } from '../../../services/productos/productos.service';
import { Producto } from '../../../interfaces/productos/producto';
import { AlertasService } from '../../../services/shared/alertas/alertas.service';
import { StripeEmbeddedCheckout } from '@stripe/stripe-js';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {
  _CompartidoService = inject(CompartidoService);
  _CarritoService = inject(CarritoService);
  _VentasService = inject(VentasService);
  _MessageService = inject(MessageService);
  _ProductoService = inject(ProductosService);
  _AlertasService = inject(AlertasService);
  _Router = inject(Router);
  formBuilder = inject(FormBuilder);
  _ActivatedRoute = inject(ActivatedRoute);

  @ViewChild('mensajesErrorMetodoEnvio') mensajesErrorMetodoEnvio!: ElementRef;
  @ViewChild('mensajesErrorMetodoPago') mensajesErrorMetodoPago!: ElementRef;

  productos: Producto[] = [];
  productosCarrito: ProductoCarrito[] = [];
  contadorProductosCarrito: number = 0;
  totalPrecioCervezas: number = 0;
  metodoEnvioSeleccionado: { label: string; value: string } | undefined;
  metodosEnvio: { label: string; value: string }[] = [
    { label: 'Recoger en tienda', value: '1' },
    { label: 'Envio domicilio', value: '2' },
  ];

  formPedido: FormGroup;
  formDireccionEnvio: FormGroup;
  creandoVenta: boolean = false;

  pagandoCarrito: boolean = false;

  componenteStripe!: StripeEmbeddedCheckout;

  constructor() {
    this.formPedido = this.formBuilder.group({
      metodoEnvio: ['', [Validators.required]],
    });

    this.formDireccionEnvio = this.formBuilder.group({
      nombrePersonaRecibe: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      numeroCasa: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.maxLength(5)]],
      ciudad: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  validarErroresMetodoEnvio() {
    this.mensajesErrorMetodoEnvio.nativeElement.innerHTML = '';
  }

  async pagarConStripe() {
    this.limpiarCheckout();

    let crearVenta: CrearVentaDTO = {};

    let sePuedeMandarPedido = this.validarMetodoEnvio();

    if (sePuedeMandarPedido) {
      this.pagandoCarrito = true;

      crearVenta.metodoEnvio = parseInt(this.metodoEnvioSeleccionado!.value);

      if (this.metodoEnvioSeleccionado?.value == '2') {
        crearVenta.nombrePersonaRecibe =
          this.formDireccionEnvio.value.nombrePersonaRecibe;
        crearVenta.calle = this.formDireccionEnvio.value.calle;
        crearVenta.numeroCasa = this.formDireccionEnvio.value.numeroCasa;
        crearVenta.codigoPostal = this.formDireccionEnvio.value.codigoPostal;
        crearVenta.ciudad = this.formDireccionEnvio.value.ciudad;
        crearVenta.estado = this.formDireccionEnvio.value.estado;
      }

      let detallesVenta: DetalleVentaDTO[] = [];

      this.productosCarrito.forEach((productoCarrito) => {
        let nuevoDetalleVenta: DetalleVentaDTO = {
          idReceta: productoCarrito.idReceta,
          cantidad: productoCarrito.cantidad,
          pack: productoCarrito.cantidadPaquete,
        };

        detallesVenta.push(nuevoDetalleVenta);
      });

      crearVenta.detalles = detallesVenta;

      crearVenta.metodoPago = 3;

      this.creandoVenta = true;
      this.componenteStripe = await this._CarritoService.checkout(crearVenta);
      this.creandoVenta = false;
      this.componenteStripe.mount('#checkout');
    }
  }

  limpiarCheckout() {
    if (this.componenteStripe) {
      try {
        this.componenteStripe.destroy();
      } catch (error) {}
    }
  }

  validarMetodoEnvio(): boolean {
    if (this.metodoEnvioSeleccionado == undefined) {
      this.mensajesErrorMetodoEnvio.nativeElement.innerHTML =
        '<p>Por favor selecciona un método de envio</p>';
      return false;
    } else {
      if (this.metodoEnvioSeleccionado?.value == '2') {
        if (this.formDireccionEnvio.valid) {
          return true;
        } else {
          this.formDireccionEnvio.markAllAsTouched();
          return false;
        }
      } else {
        return true;
      }
    }
  }

  realizarPedido(crearVenta: CrearVentaDTO) {
    this.creandoVenta = true;

    this._VentasService.crearVenta(crearVenta).subscribe({
      next: (nuevaVenta: VentaDTO) => {
        this._AlertasService.showSuccess(
          "Tu compra ha sido confirmada. Puedes revisar el estado en la sección 'Mis pedidos'",
          '¡Compra realizada con éxito!'
        );
        this._CarritoService.vaciarProductosCarrito();

        this.creandoVenta = false;

        this._Router.navigateByUrl('cerverica/pedidos');
      },
      error: (error) => {
        if (error.status == 409) {
          this._CompartidoService.solicitarActualizarProductos();

          const listaProductos =
            error.error.productosCarritoEliminados.join(', ');

          const mensajeDetalle = `Lamentamos el inconveniente, pero nos quedamos sin stock en las siguientes cervezas: ${listaProductos}`;

          this._MessageService.add({
            severity: 'info',
            summary: 'Cervezas sin stock',
            detail: mensajeDetalle,
          });
        } else {
          console.log(error);
        }

        this.creandoVenta = false;
      },
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();

    this._CarritoService.ProductosCarrito.subscribe((productosCarrito) => {
      this.productosCarrito = productosCarrito;
      this.contadorProductosCarrito = productosCarrito.length;

      this.totalPrecioCervezas = 0;

      productosCarrito.forEach((productoCarrito) => {
        let precioPaquete;
        // Selecciona el precio correspondiente según la cantidadLote
        switch (productoCarrito.cantidadPaquete) {
          case 1:
            precioPaquete = productoCarrito.receta.precioPaquete1;
            break;
          case 6:
            precioPaquete = productoCarrito.receta.precioPaquete6;
            break;
          case 12:
            precioPaquete = productoCarrito.receta.precioPaquete12;
            break;
          case 24:
            precioPaquete = productoCarrito.receta.precioPaquete24;
            break;
          default:
            precioPaquete = 0; // O algún valor por defecto o manejar el error
        }

        productoCarrito.precioPaquete = precioPaquete;

        this.totalPrecioCervezas +=
          productoCarrito.cantidad * productoCarrito.precioPaquete;
      });
    });

    const ventaQP = this._ActivatedRoute.snapshot.queryParamMap.get('venta');

    if (ventaQP) {
      const decodedJson = decodeURIComponent(ventaQP);

      let crearVentaDTO = JSON.parse(decodedJson);

      this.realizarPedido(crearVentaDTO);
    }
  }

  obtenerProductoCorrespondiente(productoCarrito: ProductoCarrito): any {
    return this.productos.find(
      (producto) => producto.id === productoCarrito.receta.id
    );
  }

  obtenerProductos() {
    this._ProductoService.obtenerProductos().subscribe({
      next: (productosResponse) => {
        this.productos = productosResponse;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  cupon: string = '';

  aplicarCupon() {
    if (this.cupon) {
      console.log('Aplicar cupón:', this.cupon);
      // Lógica para aplicar el cupón
    }
  }
}
