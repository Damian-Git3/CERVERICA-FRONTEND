/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComentariosService } from './comentarios.service';

describe('Service: Comentarios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComentariosService],
    });
  });

  it('should ...', inject(
    [ComentariosService],
    (service: ComentariosService) => {
      expect(service).toBeTruthy();
    },
  ));
});
