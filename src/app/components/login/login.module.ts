import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutes } from './login.routing';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutes, CardModule, ButtonModule],
  exports: [LoginComponent],
})
export class LoginModule {}
