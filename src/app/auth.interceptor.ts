import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CompartidoService } from './services/compartido/compartido.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  var _CompartidoService = inject(CompartidoService);

  if (_CompartidoService.usuarioEnMemoria()) {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${_CompartidoService.obtenerSesion().token}`,
      ),
    });
  }

  return next(req);
};
