import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store.management';
import * as AuthActions from './../../authentication/store/auth.actions';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/authentication/store/auth.reducers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  authState: Observable<AuthState>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('authState');
  }

  test() {
    this.store.dispatch(new AuthActions.AttemptSignin( { username: 'test', password: 'test' }));
  }

}
