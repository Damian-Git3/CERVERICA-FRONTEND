import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { ModalComponent } from './modal/modal.component';
import { LotesInsumoRoutes } from './lotes-insumo.routing';
import { PrimeModule } from '../../prime/prime.module';
import { FormErrorMessagesComponent } from "../../form-error-messages/form-error-messages.component";

@NgModule({
  declarations: [TablaComponent, ModalComponent],
  imports: [CommonModule, LotesInsumoRoutes, PrimeModule, FormErrorMessagesComponent],
})
export class LotesInsumoModule {}
