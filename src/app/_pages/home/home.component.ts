import { Component } from '@angular/core';
import { AuthenticateComponent } from '../../_components/authenticate/authenticate.component';
import { NavComponent } from '../../_components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuthenticateComponent, NavComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  imgSource = 'assets/images/spider-man2-spider-man.gif';
  constructor(public router: Router) {}
}
