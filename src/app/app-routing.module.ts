import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AlertConfigurationComponent } from './components/alert-configuration/alert-configuration.component';
import { HomeComponent } from './components/home/home.component';
import { StationMapComponent } from './components/station-map/station-map.component';
import { AccountComponent } from './components/account/account.component';
import { AuthGuard } from './authentication/auth.guard';


const routes: Route[] = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  // todo: commented out temporarily: restore when not needed
  // {path: 'alerts', component: AlertConfigurationComponent, canActivate: [AuthGuard]},
  {path: 'alerts', component: AlertConfigurationComponent},
  {path: 'map', component: StationMapComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
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
