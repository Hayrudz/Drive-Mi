import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { NavService } from './nav.service';

@Injectable({
  providedIn: 'root'
})
export class UberService {

  start_latitude: number;
  start_longitude: number;
  end_latitude: number;
  end_longitude: number;

  constructor(private http: HttpClient,
              private navService: NavService) {
 }

  getUberPrice() {
    this.start_latitude = this.navService.pickup.latitude;
    this.start_longitude = this.navService.pickup.longitude;
    this.end_latitude = this.navService.dropoff.latitude;
    this.end_latitude = this.navService.dropoff.longitude;
    console.log(this.start_latitude, this.start_longitude, this.end_latitude, this.end_longitude);
  }



}
