import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionComponent } from './gestion.component';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { GestionRoutes } from './gestion.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { PrimeModule } from '../prime/prime.module';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    GestionRoutes,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    FontAwesomeModule,
    CardModule,
    DialogModule,
    ToolbarModule,
    PrimeModule,
  ],
  declarations: [GestionComponent, MenuComponent, NavbarComponent, InicioComponent],
})
export class GestionModule {}
