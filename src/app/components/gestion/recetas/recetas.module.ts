import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RecetasRoutes } from './recetas.routing';
import { RecetasTablaComponent } from './recetas-tabla/recetas-tabla.component';
import { RecetasModalComponent } from './recetas-modal/recetas-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { RecetasModalPasosComponent } from './recetas-modal-pasos/recetas-modal-pasos.component';
import { FormErrorMessagesComponent } from '../../form-error-messages/form-error-messages.component';

@NgModule({
  declarations: [
    RecetasTablaComponent,
    RecetasModalComponent,
    RecetasModalPasosComponent,
  ],
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
    TagModule,
    InputTextareaModule,
    CardModule,
    InputNumberModule,
    TooltipModule,
    FormsModule,
    MultiSelectModule,
    ToolbarModule,
    FormErrorMessagesComponent,
    InputTextareaModule,
  ],
  providers: [DatePipe],
})
export class RecetasModule {}
