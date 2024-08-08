import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modulos/inicio/inicio.component';
import { ProductosComponent } from './modulos/productos/productos.component';
import { NosotrosComponent } from './modulos/nosotros/nosotros.component';
import { LoginComponent } from './modulos/login/login.component';
import { PerfilComponent } from './modulos/perfil/perfil.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent, pathMatch: 'full' },
  { path: 'nosotros', component: NosotrosComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'perfil', component: PerfilComponent, pathMatch: 'full', canActivate: [authGuard]},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
