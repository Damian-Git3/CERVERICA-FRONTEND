import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CompartidoService } from '../../services/compartido/compartido.service';
import { MessageService } from 'primeng/api';

export const gestionGuard: CanActivateFn = (route, state) => {
  /* const router = inject(Router);
  const _CompartidosService = inject(CompartidoService);
  const _MessageService = inject(MessageService);

  const localUser = _CompartidosService.obtenerSesion();

  if (localUser != null) {
    if (localUser.rol != 'Cliente') {
      _MessageService.add({
        severity: 'info',
        summary: 'No puedes acceder',
        detail: 'No es posible acceder a estos modulos siendo un operador',
      });
      router.navigateByUrl('gestion');
      
      return false;
    } else {
      return true;
    }
  } */

  return true;
};
