/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeputadoService } from './deputado.service';

describe('Service: Deputado', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeputadoService]
    });
  });

  it('should ...', inject([DeputadoService], (service: DeputadoService) => {
    expect(service).toBeTruthy();
  }));
});
