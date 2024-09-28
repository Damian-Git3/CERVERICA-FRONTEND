import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresModalComponent } from './proveedores-modal.component';

describe('ProveedoresModalComponent', () => {
  let component: ProveedoresModalComponent;
  let fixture: ComponentFixture<ProveedoresModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProveedoresModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedoresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
