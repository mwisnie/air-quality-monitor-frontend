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
  allStations: Array<Station> = [];
  userStations: Array<Station> = [];
  stationsAlertLevel: Map<string, number> = new Map();
  stationDetail: Array<MeasurementPoint> = [];

  userSubscr: Subscription;
  stationsSubscription: Subscription;
  stationDetailSubscription: Subscription;

  selectedStationId = -1;
  alertOnPlaceholder = false;

  constructor(private authService: AuthenticationService,
              private apiService: ExternalApiService) { }

  ngOnInit(): void {
    this.getUserData();
    // map user stations (id and level) to s
    this.getStationData();
  }

  ngOnDestroy(): void {
    if (this.userSubscr) {
      this.userSubscr.unsubscribe();
    }
    if (this.stationDetailSubscription) {
      this.stationDetailSubscription.unsubscribe();
    }
    if (this.stationsSubscription) {
      this.stationsSubscription.unsubscribe();
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
        this.allStations = stations;
    });
  }

  getStationDetail(id: number): void {
    this.stationDetailSubscription = this.apiService.getStationDetail(id)
      .subscribe(detail => {
        this.stationDetail = detail;
    });
    this.selectedStationId = id;
  }

  addStation(id: number): void {
    if (this.userStations.length === 5) {
      return;
    }
    const selectedStation = this.allStations.find(station => station.id === id);
    if (selectedStation && this.userStations.filter(st => st.id === selectedStation.id).length === 0) {
      this.userStations.push(selectedStation);
    }
  }

  removeStation(id: number): void {
    this.userStations.splice(this.userStations.findIndex(st => st.id === id), 1);
  }

  getAlertLevelForStation(id: number): string {
    const alertLevel = this.stationsAlertLevel.get(id.toString());
    if (alertLevel) {
      return alertLevel.toString();
    } else {
      return 'Brak poziomu';
    }
  }

  getSlectedStationName(): string {
    const name = this.allStations.filter(st => st.id === this.selectedStationId)[0].stationName;
    return name !== null ? name : '';
  }

}
