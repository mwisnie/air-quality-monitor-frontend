import { Component, OnInit } from '@angular/core';
import { ExternalApiService } from '../../services/external-api.service';
import { Station } from '../../model/Station';
import { MeasurementPoint } from '../../model/MeasurementPoint';

@Component({
  selector: 'app-station-map',
  templateUrl: './station-map.component.html',
  styleUrls: ['./station-map.component.css']
})
export class StationMapComponent implements OnInit {

  stations: Array<Station> = [];
  stationDetail: Array<MeasurementPoint> = [];

  constructor(private apiService: ExternalApiService) { }

  ngOnInit(): void {
    this.apiService.getAllStations().subscribe(stations => {
      this.stations = stations;
    });
  }

  getStationDetail(id: number): void {
    this.apiService.getStationDetail(id).subscribe(detail => {
      this.stationDetail = detail;
      console.log(this.stationDetail);
    });
  }

}
