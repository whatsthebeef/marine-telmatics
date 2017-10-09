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

  user = {};

  constructor(public navCtrl: NavController, public backend: FirebaseBackendProvider) {
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }

  signIn() {
    console.log('New user email:' + this.user['email']);
    this.backend.login(this.user)
      .then(result => {
        this.navCtrl.setRoot(StatusPage, {boats:result['boats'], users_id:result['user_id']})
      }, err => {
        console.log(err);
        // DELETE THIS once server response is correct
        this.navCtrl.setRoot(StatusPage)
      });
  }
}
