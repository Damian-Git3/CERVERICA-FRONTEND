import { Component, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PrimeModule } from './components/prime/prime.module';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Messaging } from '@angular/fire/messaging';
import { FcmService } from './services/firebase/fcm.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, PrimeModule, FontAwesomeModule],
})
export class AppComponent {
  title = 'cerverica-landing';
  private messaging = inject(Messaging);

  constructor(private primengConfig: PrimeNGConfig, private fcmService: FcmService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.fcmService.requestPermission();
    this.fcmService.messages.subscribe((message) => {
      console.log('New message received:', message);
      // Aquí puedes manejar la notificación en la UI
    });
  }
}
