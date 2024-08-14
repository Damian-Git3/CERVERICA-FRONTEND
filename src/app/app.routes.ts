import { Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { LandingModule } from './components/landing-page/landing-page.module';
import { GestionModule } from './components/gestion/gestion.module';
import { authGuard } from './guards/auth/auth.guard';
import { gestionGuard } from './guards/gestion/gestion.guard';

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
    path: 'gestion',
    loadChildren: () => GestionModule,
    canActivate: [authGuard],
  },
  {
    path: 'cerverica',
    loadChildren: () => LandingModule,
    canActivate: [gestionGuard],
  },
  {
    path: '**',
    redirectTo: '/cerverica',
  },
];
