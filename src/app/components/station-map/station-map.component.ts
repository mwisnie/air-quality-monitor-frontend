import { Component, OnInit } from '@angular/core';
import { ExternalApiService } from '../../services/external-api.service';
import { Station } from '../../model/Station';

@Component({
  selector: 'app-station-map',
  templateUrl: './station-map.component.html',
  styleUrls: ['./station-map.component.css']
})
export class StationMapComponent implements OnInit {

  stations: Array<Station> = [];

  constructor(private apiService: ExternalApiService) { }

  ngOnInit() {
  }

  test() {
    this.apiService.getAllStations().subscribe(stations => {
      this.stations = stations;
    });
  }

}
