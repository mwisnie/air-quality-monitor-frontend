import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  submitted = false;
  user = new User();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.user);
  }

}
