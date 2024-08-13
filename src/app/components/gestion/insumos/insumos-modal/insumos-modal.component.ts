import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InsumosService } from '../../../../services/insumos/insumos.service';
import { IInsumo } from '../../../../interfaces/insumo.interface';

@Component({
  selector: 'app-insumos-modal',
  templateUrl: './insumos-modal.component.html',
  styleUrl: './insumos-modal.component.css',
})
export class InsumosModalComponent implements OnInit {
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  public display: boolean = false;
  public insumo: IInsumo | undefined;
  public titulo: string = '';
  public labelBoton: string = '';
  public modificar: boolean = false;

  insumoForm: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    unidadMedida: new FormControl(''),
    cantidadMaxima: new FormControl(''),
    cantidadMinima: new FormControl(''),
    costoUnitario: new FormControl(''),
    merma: new FormControl(''),
    activo: new FormControl(''),
    cantidadTotalLotes: new FormControl(''),
  });

  constructor(private insumosService: InsumosService) {}

  ngOnInit() {}

  get f() {
    return this.insumoForm.controls;
  }

  public show(insumo?: IInsumo | undefined) {
    this.display = true;

    if (insumo) {
      console.log(insumo);
      this.modificar = true;
      this.titulo = 'Editar insumo';
      this.labelBoton = 'Actualizar';
      this.insumo = insumo;
      this.insumoForm.setValue(insumo);
    } else {
      console.log(insumo);
      this.modificar = false;
      this.labelBoton = 'Guardar';
      this.titulo = 'Crear insumo';
    }

    console.log(this.insumoForm.value);
  }

  public ocultar() {
    this.display = false;
    this.insumoForm.reset();
    this.insumo = undefined;
    this.reload.emit();
  }

  guardar() {
    this.insumosService
      .crear(this.insumoForm.value)
      .subscribe((data: IInsumo) => {
        this.ocultar();
      });
  }

  actualizar() {
    this.insumosService
      .modificar(this.f['id'].value, this.insumoForm.value)
      .subscribe((data: IInsumo) => {
        this.ocultar();
      });
  }
}
