import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasTablaComponent } from './recetas-tabla.component';

describe('RecetasTablaComponent', () => {
  let component: RecetasTablaComponent;
  let fixture: ComponentFixture<RecetasTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecetasTablaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecetasTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
