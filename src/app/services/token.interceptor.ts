import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { OnInit, Injectable, OnDestroy } from '@angular/core';
import { AppState } from '../store/app.store.management';
import { AuthState } from '../authentication/store/auth.reducers';
import { take, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) { }

  intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('authState').pipe(
      take(1),
      switchMap((authState: AuthState) => {
        const authorizedRequest = request.clone({
          'setHeaders': {
            'Authorization': authState.token
          }
        });
        return authState.token ? httpHandler.handle(authorizedRequest) : httpHandler.handle(request);
      }),
    );
  }

}
