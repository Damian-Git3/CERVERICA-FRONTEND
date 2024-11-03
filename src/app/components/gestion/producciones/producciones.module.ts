import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionesTablaComponent } from './producciones-tabla/producciones-tabla.component';
import { ProduccionesModalComponent } from './producciones-modal/producciones-modal.component';
import { AlmacenarModalComponent } from './almacenar-modal/almacenar-modal.component';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProduccionesRoutes } from './producciones.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasosModalComponent } from './pasos-modal/pasos-modal.component';
import { AvanzarPasoModalComponent } from './avanzar-paso-modal/avanzar-paso-modal.component';
import { FormErrorMessagesComponent } from '../../form-error-messages/form-error-messages.component';
import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
  declarations: [
    ProduccionesTablaComponent,
    ProduccionesModalComponent,
    PasosModalComponent,
    AvanzarPasoModalComponent,
    AlmacenarModalComponent
  ],
  imports: [
    CommonModule,
    ProduccionesRoutes,
    DialogModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    CardModule,
    ImageModule,
    TagModule,
    ConfirmDialogModule,
    InputTextareaModule,
    FormErrorMessagesComponent,
    InputNumberModule,
  ],
})
export class ProduccionesModule {}
