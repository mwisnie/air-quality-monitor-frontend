import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  username = '';
  password = '';
  isBadCredentialsErrorShown = false;
  loginSubscr: Subscription = null;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.loginSubscr !== null) {
      this.loginSubscr.unsubscribe();
    }
  }

  login(): void {
    this.authenticationService.login(this.username, this.password);
    this.loginSubscr = this.authenticationService.isUserLoggedIn()
    .subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['account']);
      } else {
        setTimeout(function() {
          this.isBadCredentialsErrorShown = true;
        }, 2000);
      }
    });
  }

  hideErrorMsg() {
    this.isBadCredentialsErrorShown = false;
  }

}
