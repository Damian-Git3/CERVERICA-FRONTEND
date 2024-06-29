import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InicioComponent } from './inicio/inicio.component';
import { SharedRoutes } from './shared.routing';

@NgModule({
  declarations: [NavbarComponent, InicioComponent],
  imports: [
    CommonModule,
    SharedRoutes,
    MenubarModule,
    ButtonModule
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
