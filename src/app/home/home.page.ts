import { AfterContentInit, Component, OnInit, ViewChild, ElementRef, NgZone, Input} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, ToastController, MenuController, ModalController, NavController } from '@ionic/angular';
import { __await } from 'tslib';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { NavService } from '../service/nav.service';
import { browser } from 'protractor';
import { UberService } from '../service/uber.service';
import { LecabService } from '../service/lecab.service';
import { HelperService } from '../service/helper.service';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  latitude: number;
  longitude: number;
  marker: {
    latitude: number
    longitude: number
    };
  pickupAutoItems  = [];
  pickupAuto = {
    query: ''
  };
  dropoffAutoItem: any;
  dropoffAuto: any;
  disablePickup = false;
  disabledropoff = false;

  markers = [];
  zoom: number;

  geo: any;

  service = new google.maps.places.AutocompleteService();
  Uber: any;
  times;
  driversTime:Array<any>;
  leCabServices:Array<any>=[];

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private menu: MenuController,
    private uberService: UberService,
    private lecab: LecabService,
    private helper: HelperService,
    private nav: NavController,
    public navService: NavService) {
      navService.pickupAutocompleteItems = [];
      navService.pickupAutocomplete = {
        query: ''
      };

      navService.dropoffAutocompleteItems = [];
      navService.dropoffAutocomplete = {
        query: ''
      };

    }

  ngOnInit() {
    this.locateMe();
    this.helper.getCode().subscribe(res =>{
      let code = res;
      if(code){
        this.lecab.getServices(code)
          .subscribe((ress:any) =>{
            console.log(ress);
            this.leCabServices = ress.services;
          })
      }
    })
   }

   setTimes(lat,lng){
    this.uberService.getTime(lat,lng).subscribe(res =>{
      this.times = res;
      console.log(this.times)
      if(this.times.times){
        let x = this.times.times.filter(data => data.display_name === 'UberX' || data.display_name === 'Green' || data.display_name === 'Berline');
        if(x.length >0){
          console.log(x)
          this.driversTime = x;
        }
      }
    })
   }

   async locateMe() {
    const loader = await this.loadingCtrl.create({
       message: 'Où vous cachez vous..?',
       duration: 9000
     });
     loader.present();
     this.geolocation.getCurrentPosition().then((resp) => {
         loader.dismiss();
         this.latitude = resp.coords.latitude;
         this.longitude = resp.coords.longitude;
         this.marker = {
           latitude: resp.coords.latitude,
           longitude: resp.coords.longitude,
         };
         this.zoom = 17;
         if(this.marker.latitude && this.marker.longitude){
          this.setTimes(this.marker.latitude, this.marker.longitude);
          this.navService.getGeoLocation(48.7991555, 1.9138033);
         }
         console.log(this.marker.latitude, this.marker.longitude);
       }).catch(
          (error) => {
           loader.dismiss();
           this.toastCtrl.create({
             message: error,
           });
         });
       const watch = this.geolocation.watchPosition();
       watch.subscribe((data:any) => {
         this.latitude = data.coords.latitude;
         this.longitude = data.coords.longitude;
       });
   }

  openMenu() {
    this.menu.toggle();
    console.log('menu is open');
  }

  pickupLocation() {
    this.navService.pickupUpdateSearch();
  }

  pickupFocus(){
    this.disablePickup = false;

  }

  pickupBlur(){
    if(this.navService.pickupAutocomplete.query.length === 0){
      this.disablePickup = true;
    }
    // this.disablePickup = true;
  }

  dropoffBlur(){
    if(this.navService.dropoffAutocomplete.query.length === 0){
      this.disabledropoff = true;
    }
    // this.disabledropoff = true;
  }

  dropoffFocus(){
    this.disabledropoff = false;
  }

  pickupItem(item: any) {
    this.disablePickup = true;
    console.log(item)
    this.navService.pickupAutocomplete.query = item;
    this.navService.pickupChooseItem(item);
  }

  dropoffLocation() {
    this.navService.dropoffUpdateSearch();
  }

  dropoffItem(item: any) {
    this.disabledropoff = true;
    this.navService.dropoffAutocomplete.query = item;
    this.navService.dropoffChooseItem(item);
  }

  forward(){
    this.nav.navigateForward('/results');
  }

}
