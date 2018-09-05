import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/User';
import { UserService } from './user.service';

const LOGIN_ENDPOINT = 'http://localhost:8080/login';
const API_USER_ENDPOINT = 'http://localhost:8080/api/users/';

const requestHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
const httpOptions = {
  headers: requestHeaders,
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLoggedSubject = new BehaviorSubject<User>(null);
  jwtToken = new Subject<string>();

  constructor(private httpClient: HttpClient,
              private userService: UserService) { }

  login(username: string, password: string): void {
    const credentials = new User();
    credentials.username = username;
    credentials.password = password;

    this.httpClient.post(LOGIN_ENDPOINT, credentials, httpOptions)
      .subscribe(
        (response: HttpResponse<any>) => {
          this.getDataForUser(response.headers.get('UserId'), response.headers.get('Authorization'), credentials);
        },
        (error: HttpErrorResponse) => {
          this.userLoggedSubject.next(null);
          this.jwtToken.next(null);
          console.log('ERROR during login request');
          console.log(error);
      });
  }

  getDataForUser(userId: string, jwtToken: string, credentials: User): void {
    const getDataHttpOptions = {
      headers: requestHeaders.append('Authorization', jwtToken)
    };

    this.httpClient.get<User>(API_USER_ENDPOINT + userId, getDataHttpOptions)
      .subscribe(
        (response: User) => {
          response.password = credentials.password;
          this.userLoggedSubject.next(response);
          this.jwtToken.next(jwtToken);
          console.log('Obtained user data');
        },
        (error: HttpErrorResponse) => {
          this.userLoggedSubject.next(null);
          this.jwtToken.next(null);
          console.log('ERROR while getting user data');
          console.log(error);
        }
      );
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.userLoggedSubject.pipe(
      map(user => {
        if (user !== null) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void {
    this.userLoggedSubject.next(null);
    this.jwtToken.next(null);
  }

}
