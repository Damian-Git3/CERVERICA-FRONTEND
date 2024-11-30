import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMayoristaComponent } from './registrar-mayorista.component';

describe('RegistrarMayoristaComponent', () => {
  let component: RegistrarMayoristaComponent;
  let fixture: ComponentFixture<RegistrarMayoristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarMayoristaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMayoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
