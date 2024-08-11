import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar-landing',
  templateUrl: './navbar-landing.component.html',
  styleUrl: './navbar-landing.component.css',
})
export class NavbarLandingComponent {
  constructor(private route: ActivatedRoute) {}
}
