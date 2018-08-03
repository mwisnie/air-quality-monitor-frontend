import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { map } from 'rxjs/operators';

const LOGIN_ENDPOINT = 'http://localhost:8080/login';
const API_USER_ENDPOINT = 'http://localhost:8080/api/users/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLoggedSubject = new Subject<User>();
  jwtToken: string;

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): void {
    const credentials = new User();
    credentials.username = username;
    credentials.password = password;

    this.httpClient.post(LOGIN_ENDPOINT, credentials, httpOptions)
    .subscribe(
      (response: HttpResponse<any>) => {
        this.getDataForUser(response.headers.get('UserId'), response.headers.get('Authorization'));
      },
      (error: HttpErrorResponse) => {
        console.log('ERROR during login request');
        console.log(error);
    });
  }

  getDataForUser(userId: string, jwtToken: string): void {
    const getDataHttpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
                                'Authorization': jwtToken})};

    this.httpClient.get<User>(API_USER_ENDPOINT + userId, getDataHttpOptions)
    .subscribe(
      (response: User) => {
        this.userLoggedSubject.next(response);
        console.log('Obtained user data');
      },
      (error: HttpErrorResponse) => {
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
  }

}
