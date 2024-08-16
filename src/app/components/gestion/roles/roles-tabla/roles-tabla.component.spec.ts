import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesTablaComponent } from './roles-tabla.component';

describe('RolesTablaComponent', () => {
  let component: RolesTablaComponent;
  let fixture: ComponentFixture<RolesTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolesTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
