import { Routes, RouterModule } from '@angular/router';
import { GestionComponent } from './gestion.component';
import { MenuComponent } from './menu/menu.component';
import { ProduccionesModule } from './producciones/producciones.module';

const routes: Routes = [
  {
    path: '',
    component: GestionComponent,
    children: [
      {
        path: 'producciones',
        loadChildren: () => ProduccionesModule
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
