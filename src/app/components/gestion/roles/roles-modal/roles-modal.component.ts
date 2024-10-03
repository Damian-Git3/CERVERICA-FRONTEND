import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { RolesService } from '../../../../services/roles/roles.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { AlertasService } from '../../../../services/shared/alertas/alertas.service';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css',
})
export class RolesModalComponent implements OnInit {
  @Output() reload: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal!: Dialog;
  public display: boolean = false;
  public titulo: string = '';
  public ver: boolean = false;

  public form: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    roleName: new FormControl(''),
  });

  constructor(
    private rolesService: RolesService,
    private alertasService: AlertasService,
  ) {}

  ngOnInit() {
    console.log('RolesModalComponent inicializado');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  show(role?: any) {
    this.display = true;
    this.ver = true;
    if (role) {
      this.modal.header = 'Rol';
      this.ver = false;
      this.f['id'].setValue(role.id);
      this.f['roleName'].setValue(role.name);
      this.f['roleName'].disable();
    } else {
      this.modal.header = 'Crear Rol';
      this.ver = true;
      this.f['id'].setValue('');
      this.f['roleName'].setValue('');
      this.f['roleName'].enable();
    }
  }

  hide() {
    this.display = false;
  }

  guardar() {
    this.rolesService.crear(this.form.value).subscribe({
      next: (data: any) => {
        this.alertasService.showSuccess('Rol creado correctamente');
        console.log(data);
        this.reload.emit();
        this.display = false;
      },
      error: (error: any) => {
        this.alertasService.showError('Error al crear el rol');
        console.error(error);
      },
    });
  }
}
