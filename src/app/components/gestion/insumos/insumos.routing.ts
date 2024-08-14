import { Routes, RouterModule } from '@angular/router';
import { InsumosTablaComponent } from './insumos-tabla/insumos-tabla.component';

const routes: Routes = [
  {
    path: '',
    component: InsumosTablaComponent
  },
];

export const InsumosRoutes = RouterModule.forChild(routes);
