import { TestBed } from '@angular/core/testing';

import { LotesInsumoService } from './lotes-insumo.service';

describe('LotesInsumoService', () => {
  let service: LotesInsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotesInsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
