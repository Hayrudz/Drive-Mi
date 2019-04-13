import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import * as firebase from 'firebase';
import { Platform, MenuController, NavParams, NavController } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from 'src/app/home/home.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    mode: string;
    authForm: FormGroup;
  
  constructor(private authService: AuthService,
                private menuCtrl: MenuController,
                private navCtrl: NavController,
                private router: Router,
                private formBuilder: FormBuilder) {}
  
    ngOnInit() {
    //  this.initForm();
    }
    
    onToggleMenu() {
      this.menuCtrl.open;
    }

  /*  initForm() {
      this.authForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    onSubmitForm() {
      const email = this.authForm.get('email').value;
      const password = this.authForm.get('password').value;
        this.authService.signUpUser(email, password).then(
          () => {
            this.router.navigateByUrl('/home');
          },
          (error) => {
            this.errorMessage = error;
          }
        );
    }

    errorMessage() {

    } */

}
