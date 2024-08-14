import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CompartidoService } from '../../services/compartido/compartido.service';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _CompartidosService = inject(CompartidoService);
  const _MessageService = inject(MessageService);

  const localUser = _CompartidosService.obtenerSesion();

  if (localUser != null) {
    return true;
  } else {
    _MessageService.add({
      severity: 'info',
      summary: 'Logueo necesario',
      detail: 'Es necesario que te loguees para acceder a esta sección',
    });
    router.navigateByUrl('cerverica/login');
    return false;
  }
};
