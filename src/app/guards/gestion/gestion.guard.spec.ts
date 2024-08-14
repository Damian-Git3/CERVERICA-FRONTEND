import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gestionGuard } from './gestion.guard';

describe('gestionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gestionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
