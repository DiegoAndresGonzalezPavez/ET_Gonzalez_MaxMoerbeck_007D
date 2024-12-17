import { TestBed } from '@angular/core/testing';

import { ListadoAsistenciaService } from './listado-asistencia.service';

describe('ListadoAsistenciaService', () => {
  let service: ListadoAsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoAsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
