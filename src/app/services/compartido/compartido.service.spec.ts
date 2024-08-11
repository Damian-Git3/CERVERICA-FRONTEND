import { TestBed } from '@angular/core/testing';

import { CompartidoService } from './compartido.service';

describe('CompartidoService', () => {
  let service: CompartidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
