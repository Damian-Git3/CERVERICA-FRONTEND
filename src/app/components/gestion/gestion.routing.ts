import { Routes, RouterModule } from '@angular/router';
import { GestionComponent } from './gestion.component';
import { ProduccionesModule } from './producciones/producciones.module';
import { InsumosModule } from './insumos/insumos.module';
import { RecetasModule } from './recetas/recetas.module';
import { RolesModule } from './roles/roles.module';
import { ProveedoresModule } from './proveedores/proveedores.module';

const routes: Routes = [
  {
    path: '',
    component: GestionComponent,
    children: [
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
        path: 'roles',
        loadChildren: () => RolesModule,
      },
      {
        path: 'proveedores',
        loadChildren: () => ProveedoresModule,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

export const GestionRoutes = RouterModule.forChild(routes);
