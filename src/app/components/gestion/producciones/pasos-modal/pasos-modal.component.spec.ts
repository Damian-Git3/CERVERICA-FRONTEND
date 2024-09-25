import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasosModalComponent } from './pasos-modal.component';

describe('PasosModalComponent', () => {
  let component: PasosModalComponent;
  let fixture: ComponentFixture<PasosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasosModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
