import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import { RolesTablaComponent } from './roles-tabla/roles-tabla.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { RolesRoutes } from './roles.routing';

@NgModule({
  declarations: [RolesModalComponent, RolesTablaComponent],
  imports: [
    CommonModule,
    RolesRoutes,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ToolbarModule,
    SplitButtonModule,
    ButtonModule,
    TableModule,
  ],
})
export class RolesModule {}
