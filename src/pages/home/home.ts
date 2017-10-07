import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { StatusPage } from '../status/status';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email = '';
  password = '';
  
  constructor(public navCtrl: NavController, public backend: FirebaseBackendProvider) {

  }

  register(){
    this.navCtrl.push( RegisterPage )
  }

  status(){
    this.navCtrl.setRoot( StatusPage )
  }

  signIn(){
    this.backend.login({ email: this.email, password: this.password })
      .then(result => {
        console.log( result );
      }, err => {
        console.log( err );
      });
  }
}
