import { Routes, RouterModule } from '@angular/router';
import { GestionComponent } from './gestion.component';
import { ProduccionesModule } from './producciones/producciones.module';
import { InsumosModule } from './insumos/insumos.module';
import { RecetasModule } from './recetas/recetas.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { InicioComponent } from './inicio/inicio.component';
import { LotesInsumoModule } from './lotes-insumo/lotes-insumo.module';
import { VentasModule } from './ventas/ventas.module';
import { StockModule } from './stock/stock.module';

const routes: Routes = [
  {
    path: '',
    component: GestionComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent,
      },
      {
        path: 'usuarios',
        loadChildren: () => UsuariosModule,
      },
      {
        path: 'producciones',
        loadChildren: () => ProduccionesModule,
      },
      {
        path: 'insumos',
        loadChildren: () => InsumosModule,
      },
      {
        path: 'recetas',
        loadChildren: () => RecetasModule,
      },
      {
        path: 'proveedores',
        loadChildren: () => ProveedoresModule,
      },
      {
        path: 'lotes-insumo',
        loadChildren: () => LotesInsumoModule,
      },
      {
        path: 'ventas',
        loadChildren: () => VentasModule,
      },
      {
        path: 'stock',
        loadChildren: () => StockModule,
      },
      {
        path: '**',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
];

export const GestionRoutes = RouterModule.forChild(routes);
