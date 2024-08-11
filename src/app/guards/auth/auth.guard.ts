import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const localUser = localStorage.getItem('userSession');

  if (localUser != null) {
    return true;
  } else {
    router.navigateByUrl('/landing-page/login');
    return false;
  }
};