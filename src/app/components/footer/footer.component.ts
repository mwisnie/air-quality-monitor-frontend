import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  // checkGet() {
  //   this.userService.getCurrentUser().subscribe(users => {
  //     console.log(users);
  //   });
  // }

  // checkGet() {
  //   this.userService.getCurrentUser().subscribe(users => {
  //     console.log(users);
  //   });
  // }

  // checkGet() {
  //   this.userService.getCurrentUser().subscribe(users => {
  //     console.log(users);
  //   });
  // }

}
