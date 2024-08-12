import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {}

  login() {
    // Aquí iría la lógica para hacer login y obtener el token
    // Suponiendo que el login es exitoso:
    localStorage.setItem('isLoggedIn', 'true');
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.loggedIn.next(isLoggedIn);
  }
}
