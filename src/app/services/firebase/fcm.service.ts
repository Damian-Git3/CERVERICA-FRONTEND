import { Injectable } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  private message$: Observable<any> = new Observable();

  constructor(private messaging: Messaging) {
    this.requestPermission();
    this.listenForMessages();
  }

  async requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const token = await getToken(this.messaging, { vapidKey: 'BLcVKR3vFDbCWajlVtPElJMwWcTgD2Rxd2gf61p2koXGLmMB1D3tl-tF9kEjZHcy50bHFGDiHVIQ25OyRJWkbLU' });
        console.log('FCM Token:', token);
        // Aquí puedes enviar el token a tu servidor para almacenarlo
      } else {
        console.log('Unable to get permission to notify.');
      }
    } catch (error) {
      console.error('Error getting permission for notifications', error);
    }
  }

  private listenForMessages() {
    this.message$ = new Observable((observer) => {
      onMessage(this.messaging, (payload) => {
        console.log('Message received. ', payload);
        observer.next(payload);
      });
    });
  }

  get messages(): Observable<any> {
    return this.message$;
  }
}