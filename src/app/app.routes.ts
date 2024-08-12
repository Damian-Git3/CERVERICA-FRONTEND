import { Routes } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { LandingModule } from './components/landing-page/landing-page.module';
import { GestionModule } from './components/gestion/gestion.module';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => LoginModule,
  },
  {
    path: 'gestion',
    loadChildren: () => GestionModule,
  },
  {
    path: 'landing-page',
    loadChildren: () => LandingModule,
  },
  {
    path: '**',
    redirectTo: 'landing-page',
  },
];
