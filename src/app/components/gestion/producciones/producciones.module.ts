import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionesTablaComponent } from './producciones-tabla/producciones-tabla.component';
import { ProduccionesModalComponent } from './producciones-modal/producciones-modal.component';
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

@NgModule({
  declarations: [ProduccionesTablaComponent, ProduccionesModalComponent],
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
    ImageModule
  ],
})
export class ProduccionesModule {}
