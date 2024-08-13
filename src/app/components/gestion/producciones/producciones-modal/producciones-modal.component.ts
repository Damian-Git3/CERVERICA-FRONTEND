import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-producciones-modal',
  templateUrl: './producciones-modal.component.html',
  styleUrls: ['./producciones-modal.component.css']
})
export class ProduccionesModalComponent implements OnInit {
  public display: boolean = false;
  public produccionesForm: FormGroup | undefined = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),

  });;



  constructor() { }

  ngOnInit() {
  }

}
