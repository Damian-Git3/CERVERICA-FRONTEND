import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorMessagesComponent } from './form-error-messages.component';

describe('FormErrorMessagesComponent', () => {
  let component: FormErrorMessagesComponent;
  let fixture: ComponentFixture<FormErrorMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormErrorMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormErrorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
