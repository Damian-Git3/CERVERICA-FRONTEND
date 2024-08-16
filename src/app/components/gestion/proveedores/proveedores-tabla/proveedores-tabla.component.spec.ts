import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresTablaComponent } from './proveedores-tabla.component';

describe('ProveedoresTablaComponent', () => {
  let component: ProveedoresTablaComponent;
  let fixture: ComponentFixture<ProveedoresTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProveedoresTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedoresTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
