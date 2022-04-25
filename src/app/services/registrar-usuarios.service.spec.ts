import { TestBed } from '@angular/core/testing';

import { RegistrarUsuariosService } from './registrar-usuarios.service';

describe('RegistrarUsuariosService', () => {
  let service: RegistrarUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
