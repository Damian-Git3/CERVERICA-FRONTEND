import { Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { SharedModule } from './components/shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => LoginModule,
  },
  {
    path: 'inicio',
    loadChildren: () => SharedModule,
  },
];
