import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../store/app.store.management';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  username = '';
  password = '';
  isBadCredentialsErrorShown = false;
  loginSubscr: Subscription = null;

  constructor(private store: Store<AppState>) { }

  trySignin(): void {
    this.store.dispatch(new AuthActions.AttemptSignin({ username: this.username, password: this.password }));
  }

  // trySignin(): void {
  //   this.authenticationService.login(this.username, this.password);
  //   this.loginSubscr = this.authenticationService.isUserLoggedIn()
  //   .subscribe(isLoggedIn => {
  //     if (isLoggedIn) {
  //       this.router.navigate(['account']);
  //     } else {
  //       setTimeout(function() {
  //         this.isBadCredentialsErrorShown = true;
  //       }, 2000);
  //     }
  //   });
  // }

  hideErrorMsg() {
    this.isBadCredentialsErrorShown = false;
  }

}
