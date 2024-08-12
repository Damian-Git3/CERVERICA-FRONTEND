import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CompartidoService } from '../../services/compartido/compartido.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _CompartidosService = inject(CompartidoService);

  const localUser = _CompartidosService.obtenerSesion();

  if (localUser != null) {
    return true;
  } else {
    router.navigateByUrl('cerverica/login');
    return false;
  }
};
