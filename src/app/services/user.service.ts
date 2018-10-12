import 'rxjs/add/observable/of';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../model/User';
import { AuthenticationService } from './authentication.service';

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
              private auth: AuthenticationService) { }

  getCurrentUser(): Observable<User> {
    let currentId;
    this.auth.userLoggedSubject.subscribe(user => currentId = user.id);
    return this.getUserById(currentId);
  }

  updateCurrentUser(): Observable<User> {
    let currentUser;
    this.auth.userLoggedSubject.subscribe(user => currentUser = user);
    return this.updateUser(currentUser);
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
    this.auth.jwtToken.subscribe(token => this.jwt = token);
    const authHttpOptions = {
      headers: requestHeaders.append('Authorization', this.jwt)
    };
    return this.httpClient.post<User>(API_USER_ENDPOINT + user.id, user, authHttpOptions);
  }

  deleteUser(id: string): void {
    this.auth.jwtToken.subscribe(token => this.jwt = token);
    const authHttpOptions = {
      headers: requestHeaders.append('Authorization', this.jwt)
    };
    this.httpClient.post<User>(API_USER_ENDPOINT + id, authHttpOptions);
  }

}
