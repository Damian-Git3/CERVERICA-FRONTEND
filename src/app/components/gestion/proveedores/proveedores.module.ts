import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedoresTablaComponent } from './proveedores-tabla/proveedores-tabla.component';
import { ProveedoresModalComponent } from './proveedores-modal/proveedores-modal.component';
import { ProveedoresRoutes } from './proveedores.routing';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { FormErrorMessagesComponent } from "../../form-error-messages/form-error-messages.component";

@NgModule({
  declarations: [ProveedoresTablaComponent, ProveedoresModalComponent],
  imports: [
    CommonModule,
    ProveedoresRoutes,
    SplitButtonModule,
    ButtonModule,
    TableModule,
    TagModule,
    InputTextareaModule,
    DropdownModule,
    ToolbarModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    FormErrorMessagesComponent
],
})
export class ProveedoresModule {}
