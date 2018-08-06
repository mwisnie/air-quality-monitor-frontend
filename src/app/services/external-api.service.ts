import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../model/Station';

const STATIONS_GIOS_API_URL = 'http://localhost:8080/stations';
const requestHeaders = new HttpHeaders({
'Cache-Control': 'no-cache'});


@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {

  constructor(private httpClient: HttpClient) { }

  getAllStations(): Observable<Array<Station>> {
    return this.httpClient.get<Array<Station>>(STATIONS_GIOS_API_URL);
  }

}
