import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompartidoModule } from './compartido/compartido.module';
import { ModulosModule } from './modulos/modulos.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CompartidoModule,
    ModulosModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
