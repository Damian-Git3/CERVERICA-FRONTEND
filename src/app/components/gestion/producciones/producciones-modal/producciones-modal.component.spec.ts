/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionesModalComponent } from './producciones-modal.component';

describe('ProduccionesModalComponent', () => {
  let component: ProduccionesModalComponent;
  let fixture: ComponentFixture<ProduccionesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProduccionesModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
