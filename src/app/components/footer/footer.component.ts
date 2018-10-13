import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private userService: UserService,
              private authService: AuthenticationService) { }

  ngOnInit() {
  }

}
