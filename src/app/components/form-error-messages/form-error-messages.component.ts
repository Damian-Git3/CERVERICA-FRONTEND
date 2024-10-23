import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-messages',
  templateUrl: './form-error-messages.component.html',
  styleUrls: ['./form-error-messages.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class FormErrorMessagesComponent implements OnChanges {
  @Input() control: AbstractControl | null = null;
  @Input() label: string = '';

  constructor() {
    console.log('FormErrorMessagesComponent');
    //console.log("CONTROL",this.control);
  }

  ngOnChanges(_changes: SimpleChanges): void {
    console.log('CONTROL ERRORS', this.label, this.control?.errors);
  }
}
