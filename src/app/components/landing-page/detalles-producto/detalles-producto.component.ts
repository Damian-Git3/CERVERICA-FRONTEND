import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../../services/productos/productos.service';
import { Producto } from '../../../interfaces/productos/producto';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComentarioDTO } from '../../../interfaces/comentario/comentario-dto';
import { ComentariosService } from '../../../services/comentarios/comentarios.service';
import { NuevoComentarioDTO } from '../../../interfaces/comentario/nuevo-comentario-dto';
import { CompartidoService } from '../../../services/compartido/compartido.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrl: './detalles-producto.component.css',
})
export class DetallesProductoComponent {
  _Route = inject(ActivatedRoute);
  _ProductosService = inject(ProductosService);
  _ComentariosService = inject(ComentariosService);
  _CompartidosService = inject(CompartidoService);
  _AuthService = inject(AuthService);
  formBuilder = inject(FormBuilder);

  idProducto: number | null = null;
  producto: Producto | null = null;
  comentarios: ComentarioDTO[] = [];
  puntuacion: number = 0;

  cargando: boolean = false;
  cargandoComentarios: boolean = false;

  formComentario!: FormGroup;

  usuarioComento: boolean = false;

  isLoggedIn: boolean = false;

  _MessageService: MessageService = inject(MessageService);
  _Router: Router = inject(Router);

  opcionesOrdenamiento = [
    { label: 'Más recientes', value: 'recientes' },
    { label: 'Principales', value: 'principales' },
  ];
  opcionSeleccionada: string = 'principales';

  ordenarComentarios(event: any) {
    const valor = event.value;
    if (valor === 'recientes') {
      this.comentarios.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
    } else if (valor === 'principales') {
      this.comentarios.sort((a, b) => b.puntuacion - a.puntuacion);
    }
  }

  ngOnInit(): void {
    const idParam = this._Route.snapshot.paramMap.get('id');
    this.idProducto = idParam ? parseInt(idParam, 10) : null;

    this.obtenerProducto();
    this.obtenerComentarios();

    this.formComentario = this.formBuilder.group({
      puntuacion: ['', [Validators.required]],
      comentario: ['', Validators.required],
    });

    this._AuthService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  obtenerProducto() {
    if (this.idProducto != null) {
      this.cargando = true;

      this._ProductosService
        .obtenerProducto(this.idProducto)
        .pipe(finalize(() => (this.cargando = false)))
        .subscribe({
          next: (producto: Producto) => {
            this.producto = producto;
            this.puntuacion = this.producto.puntuacion;
          },
          error: (error: any) => {},
        });
    }
  }

  obtenerComentarios() {
    if (this.idProducto != null) {
      this.cargandoComentarios = true;

      this._ComentariosService
        .obtenerComentarios(this.idProducto)
        .pipe(finalize(() => (this.cargandoComentarios = false)))
        .subscribe({
          next: (comentarios: ComentarioDTO[]) => {
            this.comentarios = comentarios;
            this.validarUsuarioComento();
          },
          error: (error: any) => {},
        });
    }
  }

  validarUsuarioComento() {
    let idUsuario = this._CompartidosService.obtenerSesion().idUsuario;

    if (idUsuario) {
      this.usuarioComento = this.comentarios.some(
        (comentario) => comentario.idUsuario === idUsuario
      );
    }
  }

  guardarComentario() {
    if (this.idProducto != null) {
      if (this.isLoggedIn) {
        this.cargandoComentarios = true;

        let nuevoComentario: NuevoComentarioDTO = {
          puntuacion: this.formComentario.value.puntuacion,
          textoComentario: this.formComentario.value.comentario,
          idReceta: this.idProducto,
        };

        this._ComentariosService
          .agregarComentario(nuevoComentario)
          .pipe(finalize(() => (this.cargandoComentarios = false)))
          .subscribe({
            next: (nuevaPuntuacion: number) => {
              this._MessageService.add({
                severity: 'success',
                summary: 'Gracias por comentar!',
                detail:
                  'Tus comentarios son muy valiosos para nuestros productos:)',
              });
              this.obtenerComentarios();
              this.formComentario.reset();

              this.puntuacion = nuevaPuntuacion;
            },
            error: (e) => {
              console.error('Error al guardar el comentario:', e);
            },
          });
      } else {
        this.cargandoComentarios = false;
        this._MessageService.add({
          severity: 'info',
          summary: 'Logueo necesario',
          detail:
            'Por favor inicia sesión o registrate antes de agregar un comentario',
        });
        this._Router.navigateByUrl('/cerverica/login');
      }
    }
  }
}
