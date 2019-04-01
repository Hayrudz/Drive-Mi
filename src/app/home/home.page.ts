import { AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, ToastController, MenuController } from '@ionic/angular';
import { __await } from 'tslib';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: any;
  myPosition: any;
  
  google: any;
  locationCoords: any;
  timetest: any;

  latitude: number;
  longitude: number;
  marker: {
    latitude: number;
    longitude: number;
  };

  constructor(
    private androidPermissions: AndroidPermissions,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private menu: MenuController) {}
 
  ngOnInit(): void {
    this.locateMe();
    this.openMenu();
   }
  
    async locateMe() {
    let loader = await this.loadingCtrl.create({
      message: 'Où vous cachez vous..?',
      duration: 900000
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
    this.menu.enable(true, 'first');
    this.menu.open('first');
    console.log('menu is open');
  }


   /*initLocalisation() {
     this.geolocation.getCurrentPosition().then((resp) => {
       this.latitude = resp.coords.latitude;
       this.longitude = resp.coords.longitude;
       console.log('trouvé');
       this.marker = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude,
       }
       console.log(this.marker);
     }).catch((error) => {
        console.log('Impossible de localiser la position', error);
     });

     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
       this.latitude = data.coords.latitude;
       this.longitude = data.coords.longitude;
     });
   } */
}
