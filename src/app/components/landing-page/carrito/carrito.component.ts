import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CompartidoService } from '../../../services/compartido/compartido.service';
import { CarritoService } from '../../../services/carrito/carrito.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentasService } from '../../../services/ventas/ventas.service';
import { ProductoCarrito } from '../../../interfaces/carrito/producto-carrito';
import { CrearVentaDTO } from '../../../interfaces/ventas/crear-venta-dto';
import { DetalleVentaDTO } from '../../../interfaces/ventas/detalle-venta-dto';
import { VentaDTO } from '../../../interfaces/ventas/venta-dto';
import { inicializarFuncionesTarjeta } from './funciones-tarjeta';
import { EliminarProductoCarritoDTO } from '../../../interfaces/carrito/eliminar-producto-carrito-dto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  _CompartidoService = inject(CompartidoService);
  _CarritoService = inject(CarritoService);
  _VentasService = inject(VentasService);
  _MessageService = inject(MessageService);
  _Router = inject(Router);
  formBuilder = inject(FormBuilder);

  @ViewChild('mensajesErrorMetodoEnvio') mensajesErrorMetodoEnvio!: ElementRef;
  @ViewChild('mensajesErrorMetodoPago') mensajesErrorMetodoPago!: ElementRef;

  productosCarrito: ProductoCarrito[] = [];
  contadorProductosCarrito: number = 0;
  totalPrecioCervezas: number = 0;
  metodoEnvioSeleccionado: { label: string; value: string } | undefined;
  metodosEnvio: { label: string; value: string }[] = [
    { label: 'Recoger en tienda', value: '1' },
    { label: 'Envio domicilio', value: '2' },
  ];

  metodoPagoSeleccionado: { label: string; value: string } | undefined;
  metodosPago: { label: string; value: string }[] = [
    { label: 'Pago contraentrega', value: '1' },
    { label: 'Tarjeta debito o credito', value: '2' },
  ];

  formPedido: FormGroup;
  formDireccionEnvio: FormGroup;
  formTarjeta: FormGroup;

  constructor() {
    this.formPedido = this.formBuilder.group({
      metodoEnvio: ['', [Validators.required]],
      metodoPago: ['', [Validators.required]],
    });

    this.formDireccionEnvio = this.formBuilder.group({
      nombrePersonaRecibe: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      numeroCasa: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.maxLength(5)]],
      ciudad: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.formTarjeta = this.formBuilder.group({
      nombrePersonaTarjeta: ['', [Validators.required]],
      numeroTarjeta: ['', [Validators.required]],
      mesExpiracion: ['', [Validators.required]],
      anioExpiracion: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  validarErroresMetodoEnvio() {
    this.mensajesErrorMetodoEnvio.nativeElement.innerHTML = '';
  }

  validarMetodoPago(event: any) {
    this.mensajesErrorMetodoPago.nativeElement.innerHTML = '';

    if (event.value.value == 2) {
      setTimeout(() => {
        inicializarFuncionesTarjeta();
      }, 1);
    }
  }

  realizarPedido() {
    let sePuedeMandarPedido = true;
    let crearVenta: CrearVentaDTO = {};

    if (this.metodoEnvioSeleccionado == undefined) {
      this.mensajesErrorMetodoEnvio.nativeElement.innerHTML =
        '<p>Por favor selecciona un método de envio</p>';
      sePuedeMandarPedido = false;
    } else {
      crearVenta.metodoEnvio = parseInt(this.metodoEnvioSeleccionado.value);

      if (this.metodoEnvioSeleccionado?.value == '2') {
        if (this.formDireccionEnvio.valid) {
          crearVenta.nombrePersonaRecibe =
            this.formDireccionEnvio.value.nombrePersonaRecibe;
          crearVenta.calle = this.formDireccionEnvio.value.calle;
          crearVenta.numeroCasa = this.formDireccionEnvio.value.numeroCasa;
          crearVenta.codigoPostal = this.formDireccionEnvio.value.codigoPostal;
          crearVenta.ciudad = this.formDireccionEnvio.value.ciudad;
          crearVenta.estado = this.formDireccionEnvio.value.estado;
        } else {
          this.formDireccionEnvio.markAllAsTouched();
          sePuedeMandarPedido = false;
        }
      }
    }

    if (this.metodoPagoSeleccionado == undefined) {
      this.mensajesErrorMetodoPago.nativeElement.innerHTML +=
        '<p>Por favor selecciona un método de envio</p>';
      sePuedeMandarPedido = false;
    } else {
      crearVenta.metodoPago = parseInt(this.metodoPagoSeleccionado.value);

      if (this.metodoPagoSeleccionado?.value == '2') {
        if (this.formTarjeta.valid) {
          crearVenta.nombrePersonaTarjeta =
            this.formTarjeta.value.nombrePersonaTarjeta;
          crearVenta.numeroTarjeta = this.formTarjeta.value.numeroTarjeta;
          crearVenta.mesExpiracion = this.formTarjeta.value.mesExpiracion;
          crearVenta.anioExpiracion = this.formTarjeta.value.anioExpiracion;
          crearVenta.cvv = this.formTarjeta.value.cvv;
        } else {
          this.formTarjeta.markAllAsTouched();
          sePuedeMandarPedido = false;
        }
      }
    }

    if (sePuedeMandarPedido) {
      let detallesVenta: DetalleVentaDTO[] = [];

      this.productosCarrito.forEach((productoCarrito) => {
        let nuevoDetalleVenta: DetalleVentaDTO = {
          idReceta: productoCarrito.idReceta,
          cantidad: productoCarrito.cantidad,
          pack: productoCarrito.cantidadLote,
        };
        detallesVenta.push(nuevoDetalleVenta);
      });

      crearVenta.detalles = detallesVenta;

      this._VentasService
        .crearVenta(crearVenta, this._CompartidoService.obtenerSesion().token)
        .subscribe({
          next: (nuevaVenta: VentaDTO) => {
            console.log(nuevaVenta);
          },
          error: (error) => {
            if (error.status == 409) {
            } else {
              console.log(error);
            }
          },
        });
    }
  }

  eliminarProductoCarrito(productoCarrito: ProductoCarrito) {
    let productoCarritoEliminar: EliminarProductoCarritoDTO = {
      idReceta: productoCarrito.idReceta,
      cantidadLote: productoCarrito.cantidadLote,
    };

    this._CarritoService
      .eliminarProductoCarrito(
        productoCarritoEliminar,
        this._CompartidoService.obtenerSesion().token
      )
      .subscribe({
        next: () => {
          this._MessageService.add({
            severity: 'success',
            summary: 'Producto eliminado correctamente!',
            detail: 'Haz eliminado correctamente el producto de tu carrito',
          });
          this._CarritoService.eliminarListaProductosCarrito(productoCarrito);
        },
        error: (error) => {
          if (error.status == 401) {
            this._CompartidoService.tokenExpirado();
          } else {
            console.error('Error al eliminar producto carrito:', error);
          }
        },
      });
  }

  ngOnInit(): void {
    this._CarritoService.ProductosCarrito.subscribe((productosCarrito) => {
      this.productosCarrito = productosCarrito;
      this.contadorProductosCarrito = productosCarrito.length;

      this.totalPrecioCervezas = 0;

      productosCarrito.forEach((productoCarrito) => {
        let precioPaquete;
        // Selecciona el precio correspondiente según la cantidadLote
        switch (productoCarrito.cantidadLote) {
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
          productoCarrito.cantidadLote *
          productoCarrito.cantidad *
          precioPaquete;
      });
    });
  }
}
