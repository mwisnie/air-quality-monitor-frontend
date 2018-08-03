import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/User';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

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

  ngOnDestroy() {
    this.isUserLoggedInSubscr.unsubscribe();
  }

}
