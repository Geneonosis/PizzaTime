import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

/**
 * @Injectable for AuthenticateService
 * @description the purpose of this service is to
 * authenticate the user and allow them to login and proceed
 * */
@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<User> {
    return this.http
      .post<User>('https://pizza-api-app.herokuapp.com/api/auth', {
        username,
        password,
      })
      .pipe(shareReplay());
  }
}

interface User {
  access_token: string;
}
