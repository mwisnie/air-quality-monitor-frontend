import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-configuration',
  templateUrl: './alert-configuration.component.html',
  styleUrls: ['./alert-configuration.component.css']
})
export class AlertConfigurationComponent implements OnInit, OnDestroy {

  user: User = null;
  userSubscr: Subscription = null;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  ngOnDestroy(): void {
    if (this.userSubscr) {
      this.userSubscr.unsubscribe();
    }
  }

  getUserData(): void {
    this.userSubscr = this.authService.userLoggedSubject
      .subscribe(user => {
        if (user) {
          this.user = user;
        }
    });
  }

}
