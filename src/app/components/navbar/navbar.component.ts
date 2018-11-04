import { Component, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import * as AuthActions from '../../authentication/store/auth.actions';
import { AppState } from '../../store/app.store.management';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/authentication/store/auth.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor(private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
    this.authState = this.store.select('authState');
  }

  doLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

}
