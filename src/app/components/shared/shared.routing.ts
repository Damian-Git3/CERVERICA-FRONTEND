import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
   },
];

export const SharedRoutes = RouterModule.forChild(routes);
