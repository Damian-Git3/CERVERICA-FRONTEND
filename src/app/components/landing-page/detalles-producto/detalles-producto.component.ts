import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../services/productos/productos.service';
import { Producto } from '../../../interfaces/productos/producto';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComentarioDTO } from '../../../interfaces/comentario/comentario-dto';
import { ComentariosService } from '../../../services/comentarios/comentarios.service';
import { NuevoComentarioDTO } from '../../../interfaces/comentario/nuevo-comentario-dto';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrl: './detalles-producto.component.css',
})
export class DetallesProductoComponent {
  _Route = inject(ActivatedRoute);
  _ProductosService = inject(ProductosService);
  _ComentariosService = inject(ComentariosService);
  formBuilder = inject(FormBuilder);

  idProducto: number | null = null;
  producto: Producto | null = null;
  comentarios: ComentarioDTO[] = [];
  puntuacion: number = 0;

  cargando: boolean = false;

  formComentario!: FormGroup;

  ngOnInit(): void {
    const idParam = this._Route.snapshot.paramMap.get('id');
    this.idProducto = idParam ? parseInt(idParam, 10) : null;

    this.obtenerProducto();
    this.obtenerComentarios();

    this.formComentario = this.formBuilder.group({
      puntuacion: ['', [Validators.required]],
      comentario: ['', Validators.required],
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
            console.log(this.puntuacion);
          },
          error: (error: any) => {},
        });
    }
  }

  obtenerComentarios() {
    if (this.idProducto != null) {
      this.cargando = true;

      this._ComentariosService
        .obtenerComentarios(this.idProducto)
        .pipe(finalize(() => (this.cargando = false)))
        .subscribe({
          next: (comentarios: ComentarioDTO[]) => {
            this.comentarios = comentarios;
            console.log(this.comentarios);
          },
          error: (error: any) => {},
        });
    }
  }

  guardarComentario() {
    if (this.idProducto != null) {
      let nuevoComentario: NuevoComentarioDTO = {
        puntuacion: this.formComentario.value.puntuacion,
        textoComentario: this.formComentario.value.comentario,
        idReceta: this.idProducto,
      };

      this._ComentariosService.agregarComentario(nuevoComentario).subscribe({
        next: () => {
          this.obtenerComentarios();
        },
        error: (e) => {
          console.error('Error al agregar favorito:', e);
        },
      });
    }
  }
}
