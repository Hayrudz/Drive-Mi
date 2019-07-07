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

//  url = 'https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075';

  getUberPrice() {
    this.start_latitude = this.navService.pickup.latitude;
    this.start_longitude = this.navService.pickup.longitude;
    this.end_latitude = this.navService.dropoff.latitude;
    this.end_latitude = this.navService.dropoff.longitude;
    console.log(this.start_latitude, this.start_longitude, this.end_latitude, this.end_longitude);
  }

  //6vla-SQEhJlSng5VgaaddllCtXAPqFZUh2DPjOSb

  sendRequest(){
    let url = this.setPriceURL();
    const headers = new HttpHeaders()
             .set('Authorization', 'Token 6vla-SQEhJlSng5VgaaddllCtXAPqFZUh2DPjOSb')
             .set('Accept-Language', 'en_US')
             .set('content-type', 'application/json')
    
             return this.http
             .get(url, { headers: headers });


  }

  getTime(lat?,lng?){
    let url = '';
    if(lat && lng){
      url = this.setTimeURL(lat,lng);
    }
    else{
      url = this.setTimeURL();
    }
    
    const headers = new HttpHeaders()
             .set('Authorization', 'Token 6vla-SQEhJlSng5VgaaddllCtXAPqFZUh2DPjOSb')
             .set('Accept-Language', 'en_US')
             .set('content-type', 'application/json')
    
             return this.http
             .get(url, { headers: headers });
  }

  setPriceURL(){
    let start_latitude = JSON.parse(localStorage.getItem('pickup')).latitude;
    let start_longitude = JSON.parse(localStorage.getItem('pickup')).longitude;

    let end_latitude = JSON.parse(localStorage.getItem('dropoff')).latitude;
    let end_longitude = JSON.parse(localStorage.getItem('dropoff')).longitude;
    let url = `https://api.uber.com/v1.2/estimates/price?start_latitude=${start_latitude}&start_longitude=${start_longitude}&end_latitude=${end_latitude}&end_longitude=${end_longitude}`;
    return url;
  }

  setTimeURL(lat?, lng?){
    let start_latitude: any;
    let start_longitude: any;
    if(lat && lng){
      start_latitude = lat;
      start_longitude = lng;
    }
    else{
      start_latitude = JSON.parse(localStorage.getItem('pickup')).latitude;
      start_longitude = JSON.parse(localStorage.getItem('pickup')).longitude;
    }

    let url = `https://api.uber.com/v1.2/estimates/time?start_latitude=${start_latitude}&start_longitude=${start_longitude}`;
    return url;
  }




}
