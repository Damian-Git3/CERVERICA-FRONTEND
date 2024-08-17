import { TestBed } from '@angular/core/testing';

import { ProduccionesService } from './producciones.service';

describe('ProduccionesService', () => {
  let service: ProduccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
