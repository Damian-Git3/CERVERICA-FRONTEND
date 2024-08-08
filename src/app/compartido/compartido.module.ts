import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from '../prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrimeModule],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    PrimeModule,
  ],
  providers: [provideHttpClient()],
})
export class CompartidoModule {}
