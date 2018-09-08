import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/User';
import { Subscription } from 'rxjs';
import { Station } from '../../model/Station';
import { ExternalApiService } from '../../services/external-api.service';
import { MeasurementPoint } from '../../model/MeasurementPoint';

@Component({
  selector: 'app-alert-configuration',
  templateUrl: './alert-configuration.component.html',
  styleUrls: ['./alert-configuration.component.css']
})
export class AlertConfigurationComponent implements OnInit, OnDestroy {

  user: User = null;
  stations: Array<Station> = [];
  userStationList: Array<Station> = [];
  stationDetail: Array<MeasurementPoint> = [];

  isListFullAlert = false;

  userSubscr: Subscription;
  stationsSubscription: Subscription;
  stationDetailSubscription: Subscription;

  constructor(private authService: AuthenticationService,
              private apiService: ExternalApiService) { }

  ngOnInit(): void {
    this.getUserData();
    this.getStationData();
  }

  ngOnDestroy(): void {
    if (this.userSubscr) {
      this.userSubscr.unsubscribe();
    }
  }

  getUserData(): void {
    this.userSubscr = this.authService.userLoggedSubject
      .subscribe(user => {
        if (user) {
          this.user = user;
        }
    });
  }

  getStationData(): void {
    this.stationsSubscription = this.apiService.getAllStations()
      .subscribe(stations => {
        this.stations = stations;
    });
  }

  getStationDetail(id: number): void {
    this.stationDetailSubscription = this.apiService.getStationDetail(id)
      .subscribe(detail => {
        this.stationDetail = detail;
    });
  }

  addStation(id: number): void {
    console.log(id);
    if (this.userStationList.length === 5) {
      this.isListFullAlert = true;
      return;
    }
    const selectedStation = this.stations.find(station => station.id === id);
    if (selectedStation) {
      this.userStationList.push(selectedStation);
    }
  }

}
