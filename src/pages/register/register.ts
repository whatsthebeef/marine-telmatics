import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusPage } from '../status/status';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  /*
  user = {
    "display_name" : "Jay Name",
    "email" : "email3@email.com",
    "first_name" : "Jay Name",
    "home_phone" : "000000000000",
    "last_modified" : "2017-01-02 00:00",
    "last_name" : "Last Name",
    "mobile_phone" : "00000000000",
    "password" : "hello123",
    "status" : "Pending",
    "username" : "email3@email.com"
  };
  */

  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               public backend: FirebaseBackendProvider
             ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.backend.register(this.user)
      .then(boats => {
        this.navCtrl.setRoot(StatusPage, {boats:boats})
      }, err => {
        console.log(err);
        // DELETE THIS once server response is correct
        this.navCtrl.setRoot(StatusPage)
      });
  }

}
