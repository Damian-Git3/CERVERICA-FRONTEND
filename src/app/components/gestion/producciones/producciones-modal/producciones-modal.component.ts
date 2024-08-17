import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../../../services/usuarios/usuarios.service';
import { RecetaService } from '../../../../services/receta/receta.service';
import { ProduccionesService } from '../../../../services/producciones/producciones.service';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-producciones-modal',
  templateUrl: './producciones-modal.component.html',
  styleUrls: ['./producciones-modal.component.css'],
})
export class ProduccionesModalComponent implements OnInit {
  @Output() reload: EventEmitter<any> = new EventEmitter();
  public display: boolean = false;
  public usuariosOperador: any[] = [];
  public recetas: any[] = [];
  public form: FormGroup = new FormGroup({
    idReceta: new FormControl(''),
    numeroTandas: new FormControl(''),
    idUsuario: new FormControl(''),
  });

  constructor(

    private usuariosService: UsuariosService,
    private recetasService: RecetaService,
    private produccionesService: ProduccionesService,
    private alertasService: AlertasService

  ) {}

  ngOnInit() {
    this.obtenerUsuariosOperador();
    this.obtenerRecetas();
  }

  obtenerUsuariosOperador() {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (data: any) => {
        /* FILTRAMOS SOLO LOS USUARIOS OPERADOR */
        /* ASIGNAMOS SOLO EL VALOR nombre Y id */
        this.usuariosOperador = data
          .filter((usuario: any) => usuario.rol === 'Operador')
          .map((usuario: any) => {
            return {
              nombre: usuario.nombre,
              idUsuario: usuario.id,
            };
          });
      },
      error: (error: any) => {
        console.error('Error al obtener los usuarios operador');
      },
    });
  }

  obtenerRecetas() {
    this.recetasService.obtener().subscribe({
      next: (data: any) => {
        this.recetas = data.map((receta: any) => {
          return {
            nombre: receta.nombre,
            idReceta: receta.id,
          };
        });
      },
      error: (error: any) => {
        console.error('Error al obtener las recetas');
      },
    });
  }

  guardar() {
    console.log(this.form.value);
    this.produccionesService
      .crear(this.form.value)
      .subscribe({
        next: (data: any) => {
          this.alertasService.showInfo('Produccion creada correctamente');
          console.log('Produccion creada correctamente');
          this.reload.emit();
          this.display = false;
        },
        error: (error: any) => {
          console.log(error);
          this.alertasService.showError(error.error);
          console.error('Error al crear la produccion');
        }
      });
  }
}
