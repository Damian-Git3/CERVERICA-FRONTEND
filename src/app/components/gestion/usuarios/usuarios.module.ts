import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { UsuariosRoutes } from './usuarios.routing';
import { PrimeModule } from '../../prime/prime.module';
import { ModalComponent } from './modal/modal.component';
import { FormErrorMessagesComponent } from "../../form-error-messages/form-error-messages.component";

@NgModule({
  declarations: [TablaComponent, ModalComponent],
  imports: [CommonModule, UsuariosRoutes, PrimeModule, FormErrorMessagesComponent],
})
export class UsuariosModule {}
