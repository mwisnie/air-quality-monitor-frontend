import { Component, OnInit, OnDestroy, OnChanges, DoCheck } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnDestroy, OnInit, DoCheck {

  user: User = new User();
  userSubscr: Subscription = null;
  notImplemented = 'Functionality not yet implemented';
  changingPassword = false;
  passwordError = '';

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  ngDoCheck(): void {
    this.getUserData();
  }

  ngOnDestroy(): void {
    if (this.userSubscr !== null) {
      this.userSubscr.unsubscribe();
    }
  }

  getUserData(): void {
    this.userSubscr = this.authenticationService.userLoggedSubject
      .subscribe(user => {
        if (user !== null) {
          this.user = user;
        }
    });
  }

  startPasswordChange(): void {
    this.changingPassword = true;
  }

  finishPasswordChange(oldPassword: string, newPassword: string, newPasswordConfirm: string): void {
    if (oldPassword !== this.user.password) {
      this.passwordError = 'Incorrect old password.';
    }
    if (this.checkPasswordSimilarity(newPassword, newPasswordConfirm)) {
      // send request
    }

  }

  checkPasswordSimilarity(newPassword: string, newPasswordConfirm: string): boolean {
    this.passwordError = '';
    if (newPassword.length === 0 && newPasswordConfirm.length === 0) {
      this.passwordError = 'Password and confirm password fields are required.';
    }
    if (newPassword !== newPasswordConfirm) {
      this.passwordError = 'Passwords do not match!';
      return false;
    }
    return true;
  }

}
