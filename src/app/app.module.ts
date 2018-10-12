import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './components/about/about.component';
import { AccountComponent } from './components/account/account.component';
import { AlertConfigurationComponent } from './components/alert-configuration/alert-configuration.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StationMapComponent } from './components/station-map/station-map.component';
import { UnregisteredComponent } from './components/unregistered/unregistered.component';
import { AuthenticationService } from './services/authentication.service';
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
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApSx5-F1uZW8IzrlYOjFCiKDyIqW_rWnw'
    })
  ],
  providers: [
    AuthenticationService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
