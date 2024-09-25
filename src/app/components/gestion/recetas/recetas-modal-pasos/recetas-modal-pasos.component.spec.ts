import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasModalPasosComponent } from './recetas-modal-pasos.component';

describe('RecetasModalPasosComponent', () => {
  let component: RecetasModalPasosComponent;
  let fixture: ComponentFixture<RecetasModalPasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecetasModalPasosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecetasModalPasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
