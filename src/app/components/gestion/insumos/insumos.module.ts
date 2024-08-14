import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsumosTablaComponent } from './insumos-tabla/insumos-tabla.component';
import { InsumosModalComponent } from './insumos-modal/insumos-modal.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { InsumosRoutes } from './insumos.routing';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    InsumosTablaComponent,
    InsumosModalComponent,

  ],
  imports: [
    CommonModule,
    InsumosRoutes,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ToolbarModule,
    SplitButtonModule,
    ButtonModule,
    TableModule

  ]
})
export class InsumosModule { }