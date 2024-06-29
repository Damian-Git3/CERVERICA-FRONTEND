import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './components/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimeNGConfig } from 'primeng/api';
import { LoginModule } from './components/login/login.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, FontAwesomeModule, LoginModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cerverica-frontend';

  constructor(
    private primengConfig: PrimeNGConfig
  ) {

  }

  ngOnInit() {
    console.log('AppComponent inicializado');
    this.primengConfig.ripple = true;
  }
}
