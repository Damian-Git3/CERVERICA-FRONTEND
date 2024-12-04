import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { PasswordModule } from 'primeng/password';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { OrderListModule } from 'primeng/orderlist';

import { DragDropModule } from 'primeng/dragdrop';

import { PickListModule } from 'primeng/picklist';

import { ChartModule } from 'primeng/chart';

import { RatingModule } from 'primeng/rating';

import { CardModule } from 'primeng/card';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgOptimizedImage],
  exports: [
    ImageModule,
    ButtonModule,
    CarouselModule,
    SkeletonModule,
    DropdownModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    BadgeModule,
    NgOptimizedImage,
    ProgressBarModule,
    AvatarModule,
    AvatarGroupModule,
    PasswordModule,
    ToolbarModule,
    SplitButtonModule,
    TableModule,
    TagModule,
    DialogModule,
    AvatarModule,
    AvatarGroupModule,
    CalendarModule,
    InputNumberModule,
    TooltipModule,
    ConfirmPopupModule,
    OrderListModule,
    DragDropModule,
    PickListModule,
    ChartModule,
    RatingModule,
    CardModule,
    ProgressSpinnerModule,
    InputSwitchModule,
  ],
})
export class PrimeModule {}
