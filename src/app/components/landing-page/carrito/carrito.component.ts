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
import { PuntosService } from '../../../services/puntos/puntos.service';
import { CuponService } from '../../../services/cupones/cupones.service';
import { Cupon } from '../../../interfaces/cupones/Cupon';
import { finalize } from 'rxjs';
import { ConfiguracionesService } from '../../../services/configuraciones/configuraciones.service';
import { ConfiguracionVentasMayoreo } from '../../../interfaces/configuracionesVentaMayoreo/ConfiguracionVentasMayoreo';
import { ConfiguracionesGenerales } from '../../../interfaces/configuracionesGenerales/ConfiguracionGeneral';
import { ReglaPuntos } from '../../../interfaces/puntos-fidelidad/ReglaPuntos';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {
  _PuntosFidelidadService = inject(PuntosService);
  _ConfiguracionesService = inject(ConfiguracionesService);
  _CuponesService = inject(CuponService);
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

  cuponActual: Cupon | null = null;

  usarPistoPoints: boolean = false;
  buscandoCupon: boolean = false;
  pistoPointsUsuario: number = 0;
  reglaPuntos: ReglaPuntos | null = null;

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

      if (this.cuponActual) {
        crearVenta.idCupon = this.cuponActual.id;
      } else {
        crearVenta.idCupon = null;
      }

      this.creandoVenta = true;
      this.componenteStripe = await this._CarritoService.checkout(crearVenta);
      this.creandoVenta = false;
      this.componenteStripe.mount('#checkout');
    }
  }

  registrarPuntosFidelidad() {
    let precioCompraCervezas = 0; // Cambiar a let para que se pueda modificar
    this._CarritoService.ProductosCarrito.subscribe((productosCarrito) => {
      this.productosCarrito = productosCarrito;
      this.contadorProductosCarrito = productosCarrito.length;

      productosCarrito.forEach((productoCarrito) => {
        let precioPaquete;
        // Selecciona el precio correspondiente según la cantidadPaquete
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

        // Sumar el precio de cada producto al total
        precioCompraCervezas +=
          productoCarrito.cantidad * productoCarrito.precioPaquete;
      });

      console.log('SE REGISTRARAN LOS PUNTOS DE FIDELIDAD');
      const fechaSolicitud = new Date();
      const year = fechaSolicitud.getFullYear();
      const month = String(fechaSolicitud.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
      const day = String(fechaSolicitud.getDate()).padStart(2, '0');
      const hours = String(fechaSolicitud.getHours()).padStart(2, '0');
      const minutes = String(fechaSolicitud.getMinutes()).padStart(2, '0');
      const seconds = String(fechaSolicitud.getSeconds()).padStart(2, '0');
      const milliseconds = String(fechaSolicitud.getMilliseconds()).padStart(
        3,
        '0'
      );

      // Formatear como cadena ISO
      const fechaFormatoAPI = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

      console.log('PRECIO CERVEZAS');
      console.log(precioCompraCervezas);

      const puntosFidelidadDto: any = {
        montoCompra: precioCompraCervezas,
        fechaUltimaActualizacion: fechaFormatoAPI,
      };

      // ASIGNAR LOS PUNTOS DE FIDELIDAD
      this._PuntosFidelidadService
        .registrarPuntosFidelidad(puntosFidelidadDto)
        .subscribe({
          next: (data) => {
            console.log(data);
            console.log('Se asignaron correctamente los puntos de fidelidad');
          },
          error: (error) => {
            console.log(error);
          },
        });
    });
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
    this._PuntosFidelidadService.getPuntosFidelidad().subscribe({
      next: (puntosFidelidad) => {
        this.pistoPointsUsuario = puntosFidelidad.puntosDisponibles;
      },
      error: (error) => {
        console.log(error);
      },
    });
    
    this._PuntosFidelidadService.getReglaPuntos().subscribe({
      next: (reglaPuntos) => {
        this.reglaPuntos = reglaPuntos;
      },
      error: (error) => {
        console.log(error);
      },
    });

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

      this.registrarPuntosFidelidad();
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

  codigoCupon: string = '';

  calcularPrecioConDescuento(): number {
    if (this.cuponActual) {
      if (this.cuponActual.tipo === 1) {
        return this.totalPrecioCervezas * (1 - this.cuponActual.valor / 100);
      } else {
        return this.totalPrecioCervezas - this.cuponActual.valor;
      }
    }
    return this.totalPrecioCervezas;
  }

  aplicarCupon() {
    if (this.codigoCupon) {
      this.buscandoCupon = true;

      this._CuponesService
        .buscarCupon(this.codigoCupon)
        .pipe(finalize(() => (this.buscandoCupon = false)))
        .subscribe({
          next: (cupon) => {
            if (cupon.activo === true) {
              if (cupon.montoMinimo > this.totalPrecioCervezas) {
                this._MessageService.add({
                  severity: 'info',
                  summary: 'Cupón no válido',
                  detail: `El monto mínimo para aplicar este cupón es ${
                    cupon.montoMinimo
                  } MXN. Agrega ${
                    cupon.montoMinimo - this.totalPrecioCervezas
                  } MXN más a tu carrito.`,
                });
                return;
              }

              this.cuponActual = cupon;

              this._MessageService.add({
                severity: 'success',
                summary: 'Cupón aplicado',
                detail:
                  'Se ha aplicado el cupón correctamente, finaliza la compra para usar el cupón',
              });
            } else {
              this._MessageService.add({
                severity: 'error',
                summary: 'Cupón no válido',
                detail: 'El cupón no se encuentra activo',
              });
            }
          },
          error: (error) => {
            if (
              error.error.message == 'No se encontró ningún cupón con ese texto'
            ) {
              this._MessageService.add({
                severity: 'error',
                summary: 'Cupón no válido',
                detail: 'No se encontró ningún cupón con este código',
              });
            }
          },
        });
    }
  }
}
