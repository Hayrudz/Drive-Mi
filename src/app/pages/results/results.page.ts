import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/service/nav.service';
import { UberService } from 'src/app/service/uber.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  price: number;

  constructor(public navService: NavService,
              public uberService: UberService) { }

  ngOnInit() {
  }

  uberPrice() {
    // this.uberService.getUberPrice();
// tslint:disable-next-line: max-line-length
    console.log(this.uberService.start_latitude, this.uberService.start_longitude, this.uberService.end_latitude, this.uberService.end_longitude);
  }

}
