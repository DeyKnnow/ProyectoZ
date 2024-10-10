import { TestBed } from '@angular/core/testing';

import { UsuarioServiceService } from './registro-service.service';

describe('ProductServiceService', () => {
  let service: UsuarioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
