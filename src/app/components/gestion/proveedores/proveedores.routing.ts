import { Routes, RouterModule } from '@angular/router';
import { ProveedoresTablaComponent } from './proveedores-tabla/proveedores-tabla.component';

const routes: Routes = [
  {
    path: '',
    component: ProveedoresTablaComponent,
   },
];

export const ProveedoresRoutes = RouterModule.forChild(routes);
