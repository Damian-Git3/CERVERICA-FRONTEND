import { Routes, RouterModule } from '@angular/router';
import { RecetasTablaComponent } from './recetas-tabla/recetas-tabla.component';

const routes: Routes = [
  {
    path: '',
    component: RecetasTablaComponent,
  },
];

export const RecetasRoutes = RouterModule.forChild(routes);
