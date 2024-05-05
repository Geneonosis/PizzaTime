import { Component } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * @Component for AuthenticateComponent
 * @description the purpose of this component is to
 * authenticate the user and allow them to login and proceed
 * to the main application, if the user is not authenticated
 * they will receive an error message and be prompted to try
 * again
 */
@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [HttpClient],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent {
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  authenticate() {
    const formValue = this.form.value;
    if (formValue.username && formValue.password) {
      //try to authenticate
      this.authService
        .authenticate(formValue.username, formValue.password)
        .subscribe((res) => {
          console.group('User Authenticated');
          console.log(`User ${formValue.username} authenticated and logged in`);
          //typically i would not log the access token, as it is a potential security violation,
          //however, this is simply a demo application for an interview, so i will log it 3 different ways to show knowledge
          //cookie
          console.log(`Access Token: ${res.access_token}`);
          //cache the access token in cookies - no access to server side storage
          document.cookie = `access_token=${res.access_token}`; //the cookie is not secure, and can be accessed by any script on the page
          //could also store the cookie in localstorage or sessionStorage
          localStorage.setItem('access_token', res.access_token); //security drawback - can be accessed by any script on the page
          sessionStorage.setItem('access_token', res.access_token); //security drawback - can be accessed by any script on the page
          console.groupEnd();
          this.router.navigateByUrl('/');
        });
    }
  }
}

/**
 * discussion on security related issues from above:
 * concerning cookies:
 *  - document.cookie - normal cookies can be accessed by javascript, which makes them vulnerable to cros-site scripting (XSS) attacks.
 *  - localStorage - data in 'localStorage' persists until explicitly cleared, which can pose a security risk
 *  - sessionStorage - while data in 'session storage' is automatically cleared when the session is closed
 *                     (i.e. when the browser is closed), it can still be accessed by any script on the page
 *
 * In a real world environment I would consider using a secure httpOnly cookie to store the access token server side. '
 * as per this documentation: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
 */
