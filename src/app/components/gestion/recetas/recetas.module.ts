import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetasRoutes } from './recetas.routing';
import { RecetasTablaComponent } from './recetas-tabla/recetas-tabla.component';
import { RecetasModalComponent } from './recetas-modal/recetas-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [RecetasTablaComponent, RecetasModalComponent],
  imports: [
    CommonModule,
    RecetasRoutes,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ToolbarModule,
    SplitButtonModule,
    ButtonModule,
    TableModule,
  ],
})
export class RecetasModule {}
