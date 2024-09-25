import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../services/productos/productos.service';
import { Producto } from '../../../interfaces/productos/producto';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComentarioDTO } from '../../../interfaces/comentario/comentario-dto';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrl: './detalles-producto.component.css',
})
export class DetallesProductoComponent {
  _Route = inject(ActivatedRoute);
  _ProductosService = inject(ProductosService);
  formBuilder = inject(FormBuilder);

  idProducto: number | null = null;
  producto: Producto | null = null;
  puntuacion: number = 0;

  cargando: boolean = false;

  formComentario!: FormGroup;

  ngOnInit(): void {
    const idParam = this._Route.snapshot.paramMap.get('id');
    this.idProducto = idParam ? parseInt(idParam, 10) : null;

    this.obtenerProducto();

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

  guardarComentario() {
    let comentario: ComentarioDTO = {
      puntuacion: this.formComentario.value.puntuacion,
      comentario: this.formComentario.value.comentario,
    };

    console.log('hola');

    console.log(comentario);
  }
}
