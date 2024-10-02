import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PrimeModule } from './components/prime/prime.module';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, PrimeModule, FontAwesomeModule],
})
export class AppComponent {
  title = 'CervericaLanding';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    registerLocaleData(localeEs, 'es');
    this.primengConfig.ripple = true;
  }
}
