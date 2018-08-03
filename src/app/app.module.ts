import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { AccountComponent } from './components/account/account.component';
import { AlertConfigurationComponent } from './components/alert-configuration/alert-configuration.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StationMapComponent } from './components/station-map/station-map.component';
import { UnregisteredComponent } from './components/unregistered/unregistered.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    SignUpComponent,
    SignInComponent,
    UnregisteredComponent,
    AlertConfigurationComponent,
    StationMapComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
