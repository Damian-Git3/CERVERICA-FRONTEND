import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionesTablaComponent } from './producciones-tabla/producciones-tabla.component';
import { ProduccionesModalComponent } from './producciones-modal/producciones-modal.component';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProduccionesRoutes } from './producciones.routing';

@NgModule({
  declarations: [ProduccionesTablaComponent, ProduccionesModalComponent],
  imports: [
    CommonModule,
    ProduccionesRoutes,
    DialogModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
  ],
})
export class ProduccionesModule {}
