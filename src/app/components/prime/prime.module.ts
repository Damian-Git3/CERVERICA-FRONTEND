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
    PasswordModule
  ],
})
export class PrimeModule {}
