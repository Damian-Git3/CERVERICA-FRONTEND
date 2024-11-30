/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfiguracionesService } from './configuraciones.service';

describe('Service: Configuraciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguracionesService]
    });
  });

  it('should ...', inject([ConfiguracionesService], (service: ConfiguracionesService) => {
    expect(service).toBeTruthy();
  }));
});
