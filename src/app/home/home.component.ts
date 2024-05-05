import { Component } from '@angular/core';
import { AuthenticateComponent } from '../authenticate/authenticate.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuthenticateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  imgSource = 'assets/images/spider-man2-spider-man.gif';
}
