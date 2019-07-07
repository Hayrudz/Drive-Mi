import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/service/nav.service';
import { UberService } from 'src/app/service/uber.service';
import { LecabService } from 'src/app/service/lecab.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  price: string;
  prices;
  time;
  times;
  cab:any;

  constructor(public navService: NavService,
              public uberService: UberService, private lecab : LecabService) { }

  ngOnInit() {
    try{
      this.uberService.sendRequest().subscribe(res =>{
        this.prices = res;
        console.log(this.prices);
        if(this.prices.prices){
          let x = this.prices.prices.filter(data => data.display_name === 'UberX' || data.display_name === 'Green' || data.display_name === 'Berline');
          if(x.length >0){
            this.price = x;
          }
          
        }
      });
      this.uberService.getTime().subscribe(res =>{
        this.times = res;
        console.log(this.times)
        if(this.times.times){
          let x = this.times.times.filter(data => data.display_name === 'UberX' || data.display_name === 'Green' || data.display_name === 'Berline');
          if(x.length >0){
            this.time = x;
          }
        }
      });

      this.lecab.getJobEstimation().subscribe((res : any) =>{
        this.cab = res;
        console.log(res)
      })
    }
    catch(e){
      console.log('error');
    }
   
  }

  getTime(val){
    if(this.time){
      let x = this.time.filter(data => data.display_name  === val);
      if(x.length > 0){
        return x[0].estimate / 60 ;
      }
    }
  }

  uberPrice() {
    // this.uberService.getUberPrice();
// tslint:disable-next-line: max-line-length
    console.log(this.uberService.start_latitude, this.uberService.start_longitude, this.uberService.end_latitude, this.uberService.end_longitude);
  }

  book(){
    console.log(this.cab.estimate_id)
    this.lecab.bookRide(this.cab.estimate_id,'Joe','Carter','+33787156156','Dont come.')
    .subscribe(res =>{
      console.log(res);
    })
  }

}
