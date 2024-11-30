/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CuponesService } from './cupones.service';

describe('Service: Cupones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CuponesService]
    });
  });

  it('should ...', inject([CuponesService], (service: CuponesService) => {
    expect(service).toBeTruthy();
  }));
});
