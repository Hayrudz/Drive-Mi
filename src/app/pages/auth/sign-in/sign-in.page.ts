import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UberService } from 'src/app/service/uber.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  authForm: FormGroup;
  errorMessage: Error;
  

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder, private uber: UberService) { }

  ngOnInit() {



    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
      this.authService.signInUser(email, password).then(
        () => {
          this.router.navigateByUrl('/home');
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }

  onNavigateCreate() {
    this.router.navigateByUrl('/sign-up');
  }
}
