/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenarModalComponent } from './almacenar-modal.component';

describe('AlmacenarModalComponent', () => {
  let component: AlmacenarModalComponent;
  let fixture: ComponentFixture<AlmacenarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlmacenarModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
