import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AlertConfigurationComponent } from './components/alert-configuration/alert-configuration.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StationMapComponent } from './components/station-map/station-map.component';
import { AccountComponent } from './components/account/account.component';
import { UnregisteredComponent } from './components/unregistered/unregistered.component';
import { AuthGuard } from './auth.guard';


const routes: Route[] = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'alerts', component: AlertConfigurationComponent},
  {path: 'map', component: StationMapComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'unregistered', component: UnregisteredComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
