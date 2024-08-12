import { Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { SharedModule } from './components/shared/shared.module';
import { LandingModule } from './components/landing-page/landing-page.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cerverica',
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
  {
    path: 'cerverica',
    loadChildren: () => LandingModule,
  },
  {
    path: '**',
    redirectTo: '/cerverica',
  },
];
