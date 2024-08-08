import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { CompartidoModule } from '../compartido/compartido.module';
import { ProductosService } from '../services/productos.service';
import { ProductosComponent } from './productos/productos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardComponent } from './productos/card/card.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [InicioComponent, ProductosComponent, NosotrosComponent, CardComponent, LoginComponent, PerfilComponent],
  imports: [CommonModule, CompartidoModule, InputTextModule],
  exports: [InicioComponent],
  providers: [ProductosService],
})
export class ModulosModule {}
