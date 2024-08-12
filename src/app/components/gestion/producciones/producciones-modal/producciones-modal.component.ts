import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producciones-modal',
  templateUrl: './producciones-modal.component.html',
  styleUrls: ['./producciones-modal.component.css']
})
export class ProduccionesModalComponent implements OnInit {
  public display: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
