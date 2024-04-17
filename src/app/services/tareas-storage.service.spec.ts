import { TestBed } from '@angular/core/testing';

import { TareasStorageService } from './tareas-storage.service';

describe('TareasStorageService', () => {
  let service: TareasStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
