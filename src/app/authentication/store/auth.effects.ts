import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, mergeMap, switchMap, tap, catchError } from 'rxjs/operators';

import * as AuthActions from './auth.actions';

const LOGIN_ENDPOINT = 'http://localhost:8080/login';
const API_USER_ENDPOINT = 'http://localhost:8080/api/users/';

const requestHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
const httpOptions = {
  headers: requestHeaders,
  observe: 'response' as 'response'
};

@Injectable()
export class AuthEffects {

  constructor(private actions: Actions,
              private router: Router,
              private httpClient: HttpClient) {}

  @Effect()
  attemptSignin = this.actions
    .ofType(AuthActions.ATTEMPT_SIGNIN)
    .pipe(
      map((action: AuthActions.AttemptSignin) => {
        return action.payload;
      }),
      switchMap((credentials: { username: string, password: string }) => {
        return this.httpClient.post(LOGIN_ENDPOINT, credentials, httpOptions).pipe(
          map(resp => {
            return resp;
          }),
          catchError(error => {
            console.log('Error during login.');
            console.log(error);
            // todo: emit error at login event
            return of(error);
          })
        );
      }),
      switchMap((response: HttpResponse<any>) => {
        // todo: if data not recovered correctly: throw error
        console.log(response);
        const loginData = { userId: response.headers.get('UserId'), token: response.headers.get('Authorization') };
        return of(loginData).pipe(
          tap(tappedData => {
            console.log('Login data:');
            console.log(tappedData);
          })
        );
      }),
      mergeMap((loginData: { userId: string, token: string }) => {
        return [
          {
            type: AuthActions.SIGNIN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: loginData.token
          },
        ];
      }),
      tap(() => {
        this.router.navigate(['/']);
      })
    );

  @Effect({dispatch: false})
  logout = this.actions
    .ofType(AuthActions.LOGOUT)
    .pipe(
      tap(() => {
        this.router.navigate(['/']);
      })
    );
}
