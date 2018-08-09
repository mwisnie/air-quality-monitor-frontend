import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../model/Station';
import { MeasurementPoint } from '../model/MeasurementPoint';

const STATIONS_GIOS_API_URL = 'http://localhost:8080/stations';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {

  constructor(private httpClient: HttpClient) { }

  getAllStations(): Observable<Array<Station>> {
    return this.httpClient.get<Array<Station>>(STATIONS_GIOS_API_URL);
  }

  getStationDetail(id: number): Observable<Array<MeasurementPoint>> {
    console.log('get');
    return this.httpClient.get<Array<MeasurementPoint>>(STATIONS_GIOS_API_URL + '/' + id);
  }

}
