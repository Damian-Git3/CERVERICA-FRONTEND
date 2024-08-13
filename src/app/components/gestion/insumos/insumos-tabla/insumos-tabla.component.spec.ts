import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosTablaComponent } from './insumos-tabla.component';

describe('InsumosTablaComponent', () => {
  let component: InsumosTablaComponent;
  let fixture: ComponentFixture<InsumosTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsumosTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumosTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
