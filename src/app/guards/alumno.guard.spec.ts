import { TestBed, async, inject } from '@angular/core/testing';

import { AlumnoGuard } from './alumno.guard';

describe('AlumnoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlumnoGuard]
    });
  });

  it('should ...', inject([AlumnoGuard], (guard: AlumnoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
