import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusPage } from '../status/status';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';

@IonicPage()
@Component({
  selector: 'page-register-boat',
  templateUrl: 'register-boat.html',
})
export class RegisterBoatPage {

  /*
  boat = {
    "IMEI": "861510076",
    "user_id":"Uuid903475093",
    "name":"boat name",
    "marina":"marina"
  };
  */

  boat = {};
  userId = '';

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public backend: FirebaseBackendProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterBoatPage');
    this.boat = this.navParams.get('boat') || {};
    this.userId = this.navParams.get('user_id') || this.userId; 
  }

  registerBoat() {
    this.backend.registerBoat(this.boat, this.userId).then(boats => {
      this.navParams.get('callback')(this.boat);
      this.navCtrl.pop();
    }, err => {
      console.error(err);
      // DELETE THIS once server response is correct
      this.navCtrl.pop()
    });
  }

}
