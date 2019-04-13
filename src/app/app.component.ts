import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { HomePage } from './home/home.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Accueil',
      url: '/home',
      icon: 'car'
    },
    {
      title: 'Mon Compte',
      url: '/account',
      icon: 'person'
    },
  ];

  isAuth: boolean;
  homePage: any = HomePage;

  @ViewChild('content') content: NavController;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private router: Router,
              private menuCtrl: MenuController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      let config = {
        apiKey: "AIzaSyBr5ghxXevgtzogP-5ORGJjfbjOSUOYcoc",
        authDomain: "drive-mi.firebaseapp.com",
        databaseURL: "https://drive-mi.firebaseio.com",
        projectId: "drive-mi",
        storageBucket: "drive-mi.appspot.com",
        messagingSenderId: "153781528890"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.router.navigateByUrl('/home');
          } else {
            this.isAuth = false;
            this.router.navigateByUrl('/sign-in');
          }
        }
      );
    });
  }

  onNavigate(page: any, data?) {
    this.router.navigateByUrl(page, data ? data : null);
    this.menuCtrl.close();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onDeconnect() {
    firebase.auth().signOut();
  }
}
