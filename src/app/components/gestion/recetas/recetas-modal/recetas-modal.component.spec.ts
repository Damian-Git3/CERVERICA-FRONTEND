import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasModalComponent } from './recetas-modal.component';

describe('RecetasModalComponent', () => {
  let component: RecetasModalComponent;
  let fixture: ComponentFixture<RecetasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecetasModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
