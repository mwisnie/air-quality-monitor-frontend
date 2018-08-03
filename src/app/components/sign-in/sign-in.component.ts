import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  username = '';
  password = '';
  isBadCredentialsErrorShown = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.authenticationService.login(this.username, this.password);
    this.authenticationService.isUserLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['account']);
      } else {
        this.isBadCredentialsErrorShown = true;
      }
    });
  }

  hideErrorMsg() {
    this.isBadCredentialsErrorShown = false;
  }

}
