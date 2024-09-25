import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInicioComponent } from './stock-inicio.component';

describe('StockInicioComponent', () => {
  let component: StockInicioComponent;
  let fixture: ComponentFixture<StockInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockInicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
