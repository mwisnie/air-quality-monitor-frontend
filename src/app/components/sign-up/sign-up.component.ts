import { Component, OnInit } from '@angular/core';

import { User } from '../../model/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  submitted = false;
  isRepeatedPasswordSimilar = true;
  user = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    // this.userService.addUser()
  }

  checkPasswordsSimiarity(repeatedPassword: any) {
    if (repeatedPassword.value.length === 0
        || this.user.password.length === 0
        || repeatedPassword.value !== this.user.password) {
      this.isRepeatedPasswordSimilar = false;
    } else {
      this.isRepeatedPasswordSimilar = true;
    }
  }

}
