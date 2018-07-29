import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

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

  authenticatedUser: User;
  jwtToken: string;

  constructor(private httpClient: HttpClient) { }

  isAuthenticated(): boolean {
    return false;
  }

  login(username: string, password: string): void {
    const credentials = new User();
    credentials.username = username;
    credentials.password = password;

    this.httpClient.post(LOGIN_ENDPOINT, credentials, httpOptions).subscribe((response: HttpResponse<any>) => {
      this.getDataForUser(response.headers.get('UserId'), response.headers.get('Authorization'));
    });
  }

  getDataForUser(userId: string, jwtToken: string): void {
    const getDataHttpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
                                'Authorization': jwtToken})};

    this.httpClient.get(API_USER_ENDPOINT + userId, getDataHttpOptions).subscribe((response: HttpResponse<any>) => {
      console.log(response);
    });
  }

}
