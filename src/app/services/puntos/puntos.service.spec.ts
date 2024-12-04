import { TestBed } from '@angular/core/testing';

import { PuntosService } from './puntos.service';

describe('PuntosService', () => {
  let service: PuntosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
