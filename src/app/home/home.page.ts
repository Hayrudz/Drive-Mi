import { AfterContentInit, Component, OnInit, ViewChild, ElementRef, NgZone, Input} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, ToastController, MenuController, ModalController } from '@ionic/angular';
import { __await } from 'tslib';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { NavService } from '../service/nav.service';
import { browser } from 'protractor';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  latitude: number;
  longitude: number;
  marker : {
    latitude: number
    longitude: number
    }
  pickupAutoItems  = [];
  pickupAuto = {
    query: ''
  };
  dropoffAutoItem: any;
  dropoffAuto: any;


  markers = [];
  zoom: number;

  geo: any

  service = new google.maps.places.AutocompleteService();
  Uber : any;


  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private menu: MenuController,
    private navService: NavService) {
      navService.pickupAutocompleteItems = [];
      navService.pickupAutocomplete = {
        query: ''
      }

      navService.dropoffAutocompleteItems = [];
      navService.dropoffAutocomplete = {
        query: ''
      }

    }
 
  ngOnInit() {
    this.locateMe();
   }
  
   async locateMe() {
    let loader = await this.loadingCtrl.create({
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
         }
         this.zoom = 17;
         console.log(this.marker.latitude, this.marker.longitude);
       }).catch(
          (error) => {
           loader.dismiss();
           this.toastCtrl.create({
             message: error,
           });
         });
       let watch = this.geolocation.watchPosition();
       watch.subscribe((data) => {
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

  pickupItem(item: any) {
    this.navService.pickupChooseItem(item);
  }

  dropoffLocation() {
    this.navService.dropoffUpdateSearch();
  }

  dropoffItem(item: any) {
    this.navService.dropoffChooseItem(item);
  }

}
