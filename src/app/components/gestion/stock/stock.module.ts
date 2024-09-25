import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockInicioComponent } from './stock-inicio/stock-inicio.component';
import { ProduccionModalComponent } from './produccion-modal/produccion-modal.component';



@NgModule({
  declarations: [
    StockInicioComponent,
    ProduccionModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StockModule { }
