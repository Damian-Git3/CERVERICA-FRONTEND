import { Routes, RouterModule } from '@angular/router';
import { TablaComponent } from './tabla/tabla.component';

const routes: Routes = [
  {
    path: '',
    component: TablaComponent,
  },
];

export const LotesInsumoRoutes = RouterModule.forChild(routes);
