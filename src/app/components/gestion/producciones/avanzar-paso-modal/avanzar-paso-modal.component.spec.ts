import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanzarPasoModalComponent } from './avanzar-paso-modal.component';

describe('AvanzarPasoModalComponent', () => {
  let component: AvanzarPasoModalComponent;
  let fixture: ComponentFixture<AvanzarPasoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvanzarPasoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvanzarPasoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
