import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UnregisteredComponent } from './unregistered/unregistered.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    UnregisteredComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    CommonModule
  ]
})
export class AuthModule { }
