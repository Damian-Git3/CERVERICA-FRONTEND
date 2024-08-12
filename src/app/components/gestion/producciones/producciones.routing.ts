import { Routes, RouterModule } from '@angular/router';
import { ProduccionesTablaComponent } from './producciones-tabla/producciones-tabla.component';

const routes: Routes = [
  {
    path: '',
    component: ProduccionesTablaComponent,
  },
];

export const ProduccionesRoutes = RouterModule.forChild(routes);
