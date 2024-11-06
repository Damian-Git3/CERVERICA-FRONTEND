import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockInicioComponent } from './stock-inicio/stock-inicio.component';
import { ProduccionModalComponent } from './produccion-modal/produccion-modal.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeModule } from '../../prime/prime.module';
import { StockRoutes } from './stock.routing';



@NgModule({
  declarations: [
    StockInicioComponent,
    ProduccionModalComponent
  ],
  imports: [
    CommonModule,
    StockRoutes,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ToolbarModule,
    SplitButtonModule,
    ButtonModule,
    TableModule,
    TagModule,
    InputTextareaModule,
    DropdownModule,
    PrimeModule
  ]
})
export class StockModule { }