import { TestBed } from '@angular/core/testing';

import { ApiclasesService } from './apiclases.service';

describe('ApiclasesService', () => {
  let service: ApiclasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiclasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
