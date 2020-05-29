import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorAlumnoRepoComponent } from './asesor-alumno-repo.component';

describe('AsesorAlumnoRepoComponent', () => {
  let component: AsesorAlumnoRepoComponent;
  let fixture: ComponentFixture<AsesorAlumnoRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsesorAlumnoRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesorAlumnoRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
