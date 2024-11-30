import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LandingPageComponent } from './landing-page.component';
import { ProductosComponent } from './productos/productos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PerfilComponent } from './perfil/perfil.component';

import { LoginComponent } from './login/login.component';
import { authGuard } from '../../guards/auth/auth.guard';
import { CarritoComponent } from './carrito/carrito.component';
import { carritoGuard } from '../../guards/carrito/carrito.guard';
import { CuentaComponent } from './cuenta/cuenta.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { RegistrarMayoristaComponent } from './registrar-mayorista/registrar-mayorista.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: 'inicio',
        pathMatch: 'full',
        component: InicioComponent,
        canActivate: [carritoGuard],
      },
      {
        path: 'productos',
        pathMatch: 'full',
        component: ProductosComponent,
        canActivate: [carritoGuard],
      },
      {
        path: 'producto/:id',
        pathMatch: 'full',
        component: DetallesProductoComponent,
        canActivate: [carritoGuard],
      },
      {
        path: 'nosotros',
        pathMatch: 'full',
        component: NosotrosComponent,
        canActivate: [carritoGuard],
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        canActivate: [carritoGuard],
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        canActivate: [carritoGuard],
      },
      {
        path: 'registrar-mayorista',
        pathMatch: 'full',
        component: RegistrarMayoristaComponent,
        canActivate: [carritoGuard],
      },
      {
        path: 'carrito',
        pathMatch: 'full',
        component: CarritoComponent,
        canActivate: [authGuard, carritoGuard],
      },
      {
        path: 'pedidos',
        pathMatch: 'full',
        component: PedidosComponent,
        canActivate: [authGuard, carritoGuard],
      },
      {
        path: 'detalles-pedido/:id',
        pathMatch: 'full',
        component: DetallesPedidoComponent,
        canActivate: [authGuard, carritoGuard],
      },
      {
        path: 'perfil',
        pathMatch: 'full',
        component: PerfilComponent,
        canActivate: [authGuard, carritoGuard],
      },
      {
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
];

export const LandingPageRouting = RouterModule.forChild(routes);
