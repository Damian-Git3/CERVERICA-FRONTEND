import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { SharedModule } from './components/shared/shared.module';
import { PrimeModule } from './components/prime/prime.module';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, SharedModule, PrimeModule],
})
export class AppComponent {
  title = 'CervericaLanding';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
