import { TestBed, async, inject } from '@angular/core/testing';

import { AsesorGuard } from './asesor.guard';

describe('AsesorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsesorGuard]
    });
  });

  it('should ...', inject([AsesorGuard], (guard: AsesorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
