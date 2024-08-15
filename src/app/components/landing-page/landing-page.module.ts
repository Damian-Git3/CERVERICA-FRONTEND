import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CardComponent } from './productos/card/card.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NavbarLandingComponent } from './navbar-landing/navbar-landing.component';
import { PrimeModule } from '../prime/prime.module';
import { LandingPageRouting } from './landing-page.routing';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { ProductosService } from '../../services/productos/productos.service';
import { CarritoComponent } from './carrito/carrito.component';
import { MessageService } from 'primeng/api';
import { CuentaComponent } from './cuenta/cuenta.component';
import { RecetaComponent } from './carrito/receta/receta.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    InicioComponent,
    ProductosComponent,
    NosotrosComponent,
    CardComponent,
    LoginComponent,
    PerfilComponent,
    NavbarLandingComponent,
    CarritoComponent,
    CuentaComponent,
    RecetaComponent,
    PedidosComponent,
    DetallesPedidoComponent,
  ],
  imports: [CommonModule, RouterOutlet, LandingPageRouting, PrimeModule],
  exports: [],
  providers: [ProductosService],
})
export class LandingModule {}
