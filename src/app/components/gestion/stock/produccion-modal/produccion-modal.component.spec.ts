import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionModalComponent } from './produccion-modal.component';

describe('ProduccionModalComponent', () => {
  let component: ProduccionModalComponent;
  let fixture: ComponentFixture<ProduccionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduccionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduccionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
