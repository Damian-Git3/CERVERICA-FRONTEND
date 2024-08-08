import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  declarations: [],
  imports: [CommonModule],
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
  ],
})
export class PrimeModule {}
