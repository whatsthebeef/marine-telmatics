import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StatusPage } from '../status/status';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidationMessageDirective } from '../../directives/validation-message/validation-message';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {};
  registerForm : FormGroup;

  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               public loadingCtrl: LoadingController, 
               public backend: FirebaseBackendProvider,
               public alertCtrl: AlertController,
               private fb: FormBuilder
             ) {
    this.registerForm = this.fb.group({
      'user.email': [ '', Validators.compose( [ Validators.required, Validators.email ])],
      'user.password': [ '', Validators.compose( [ Validators.required,  Validators.minLength(8) ])],
      'user.confirmPassword': [ '', Validators.compose( [ Validators.required, Validators.minLength(8) ])],
      'user.first_name': [ '', Validators.compose( [ Validators.required ])],
      'user.last_name': [ '', Validators.compose( [ Validators.required ])],
      'user.mobile_number': [ '', Validators.compose( [])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    const loading = this.loadingCtrl.create({
      content: 'Logging in. Please wait...'
    });
    loading.present();
    this.backend.register(this.user).then(result => {
        loading.dismiss();
        this.navCtrl.setRoot(StatusPage, result)
      }, err => {
        console.log(err);
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Registration Failed',
          subTitle: 'Ensure you haven\'t already used the email and the passwords match',
          buttons: ['Dismiss']
        });
        alert.present();
      });
  }

}
