import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionesTablaComponent } from './producciones-tabla.component';

describe('ProduccionesTablaComponent', () => {
  let component: ProduccionesTablaComponent;
  let fixture: ComponentFixture<ProduccionesTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduccionesTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduccionesTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
