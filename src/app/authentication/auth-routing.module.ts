import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { UnregisteredComponent } from './unregistered/unregistered.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Route[] = [
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'unregistered', component: UnregisteredComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
