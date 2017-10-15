import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { StatusPage } from '../status/status';
import { ValidationMessageDirective } from '../../directives/validation-message/validation-message';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {};
  
  authForm : FormGroup;
  constructor(public navCtrl: NavController,
              public backend: FirebaseBackendProvider,
              public loadingCtrl: LoadingController, 
              public alertCtrl: AlertController,
              private fb: FormBuilder) {
    this.authForm = this.fb.group({
      'user.email' : [ '', Validators.compose( [] )], 
      'user.password': [ '', Validators.compose( [] )]
    });
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }

  signIn() {
    const loading = this.loadingCtrl.create({
      content: 'Logging in. Please wait...'
    });
    loading.present();
    this.backend.login(this.user).then(result => {
        loading.dismiss();
        this.navCtrl.setRoot(StatusPage, result)
      }, err => {
        loading.dismiss();
        console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Login Failed',
          subTitle: 'Ensure you entered the credentials correctly and try again',
          buttons: ['Dismiss']
        });
        alert.present();
      });
  }

}
