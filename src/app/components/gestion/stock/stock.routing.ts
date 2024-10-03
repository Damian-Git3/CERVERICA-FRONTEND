import { Routes, RouterModule } from '@angular/router';
import { StockInicioComponent } from './stock-inicio/stock-inicio.component';

const routes: Routes = [
  {
    path: '',
    component: StockInicioComponent
  },
];

export const StockRoutes = RouterModule.forChild(routes);
