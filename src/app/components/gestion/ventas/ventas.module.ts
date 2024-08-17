import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { VentasRoutes } from './ventas.routing';
import { PrimeModule } from '../../prime/prime.module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [TablaComponent, ModalComponent],
  imports: [CommonModule, VentasRoutes, PrimeModule],
})
export class VentasModule {}
