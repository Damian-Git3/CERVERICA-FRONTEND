import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosModalComponent } from './insumos-modal.component';

describe('InsumosModalComponent', () => {
  let component: InsumosModalComponent;
  let fixture: ComponentFixture<InsumosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsumosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
