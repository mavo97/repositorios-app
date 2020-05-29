import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorUsuarioComponent } from './asesor-usuario.component';

describe('AsesorUsuarioComponent', () => {
  let component: AsesorUsuarioComponent;
  let fixture: ComponentFixture<AsesorUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsesorUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
