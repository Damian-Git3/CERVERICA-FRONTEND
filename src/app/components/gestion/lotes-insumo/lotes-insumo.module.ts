import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { ModalComponent } from './modal/modal.component';
import { LotesInsumoRoutes } from './lotes-insumo.routing';
import { PrimeModule } from '../../prime/prime.module';

@NgModule({
  declarations: [TablaComponent, ModalComponent],
  imports: [CommonModule, LotesInsumoRoutes, PrimeModule],
})
export class LotesInsumoModule {}
