import { TestBed } from '@angular/core/testing';

import { RegistroAsistenciaService } from './registro-asistencia.service';

describe('RegistroAsistenciaService', () => {
  let service: RegistroAsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroAsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
