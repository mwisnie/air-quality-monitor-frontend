import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isUserLoggedIn: boolean;
  isUserLoggedInSubscr: Subscription;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isUserLoggedInSubscr = this.authenticationService.isUserLoggedIn()
    .subscribe(isLoggedIn => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.isUserLoggedInSubscr.unsubscribe();
  }

}
