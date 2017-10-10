import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { StatusPage } from '../status/status';
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
              private fb: FormBuilder) {
    this.authForm = this.fb.group({
      'user.email' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'user.password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
    });
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }

  signIn() {
    this.backend.login(this.user)
      .then(result => {
        this.navCtrl.setRoot(StatusPage, result)
      }, err => {
        console.log(err);
        // DELETE THIS once server response is correct
        this.navCtrl.setRoot(StatusPage)
      });
  }
}
