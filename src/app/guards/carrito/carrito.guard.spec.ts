import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { carritoGuard } from './carrito.guard';

describe('carritoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => carritoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
