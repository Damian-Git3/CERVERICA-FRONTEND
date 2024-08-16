import { Routes, RouterModule } from '@angular/router';
import { RolesTablaComponent } from './roles-tabla/roles-tabla.component';

const routes: Routes = [
  {
    path: '',
    component: RolesTablaComponent,
  },
];

export const RolesRoutes = RouterModule.forChild(routes);
