import 'rxjs/add/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../model/User';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

const API_USER_ENDPOINT = 'http://localhost:8080/api/users/';
const requestHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
const standardHttpOptions = {
  headers: requestHeaders,
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwt: string;
  isLoggedIn: boolean;

  constructor(private httpClient: HttpClient,
              private auth: AuthenticationService,
              private router: Router) { }

  getCurrentUser(): Observable<User> {
    let currentId;
    this.auth.userLoggedSubject.subscribe(user => currentId = user.id);
    return this.getUserById(currentId);
  }

  updateCurrentUser(alertOn?: boolean, password?: string, stations?: Map<string, number>): Observable<User> {
    let currentUser: User;
    this.auth.userLoggedSubject.subscribe((user: User) => {
      currentUser = user;
      if (alertOn !== undefined) {
        currentUser.alertOn = alertOn;
      }
      if (password !== undefined) {
        currentUser.password = password;
      }
      if (stations !== undefined) {
      currentUser.stations = stations;
      }
    });
    console.log('current user' + JSON.stringify(currentUser));
    return this.updateUser(currentUser);
  }

  deleteCurrentUser(): void {
    let currentId;
    this.auth.userLoggedSubject.subscribe(user => currentId = user.id);
    this.deleteUserById(currentId);
    setTimeout(() => {
      this.auth.logoutAndRedirect();
      // this.router.navigate(['messages']); param: acc deleted // todo: implement
    }, 500);
  }

  getUserById(id: string): Observable<User> {
    this.auth.isUserLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.auth.jwtToken.subscribe(token => this.jwt = token);
    const authHttpOptions = {
      headers: requestHeaders.append('Authorization', this.jwt)
    };
    return this.isLoggedIn ? this.httpClient.get<User>(API_USER_ENDPOINT + id, authHttpOptions) : Observable.of(null);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(API_USER_ENDPOINT, user, standardHttpOptions);
  }

  updateUser(user: User): Observable<User> {
    this.auth.isUserLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.auth.jwtToken.subscribe(token => this.jwt = token);
    const authHttpOptions = {
      headers: requestHeaders.append('Authorization', this.jwt)
    };
    return this.isLoggedIn ? this.httpClient.put<User>(API_USER_ENDPOINT + user.id, user, authHttpOptions) : Observable.of(null);
  }

  deleteUserById(id: string): void {
    this.auth.isUserLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.auth.jwtToken.subscribe(token => this.jwt = token);
    const authHttpOptions = {
      headers: requestHeaders.append('Authorization', this.jwt)
    };
    if (this.isLoggedIn) {
      this.httpClient.delete<void>(API_USER_ENDPOINT + id, authHttpOptions).subscribe(() => console.log('deletd: ' + id));
    }
  }

}
