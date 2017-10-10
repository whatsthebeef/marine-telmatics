import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';

@IonicPage()
@Component({
  selector: 'page-register-boat',
  templateUrl: 'register-boat.html',
})
export class RegisterBoatPage {

  boat = {};
  userId = '';

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public backend: FirebaseBackendProvider, 
    public events: Events
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterBoatPage');
    this.userId = this.navParams.get('user_id'); 
    if(!this.userId) {
      throw Error();
    }
  }

  registerBoat() {
    this.backend.registerBoat(this.boat, this.userId).then(boats => {
      this.events.publish('boat:registered', this.boat);
      this.navCtrl.pop();
    }, err => {
      console.error(err);
      // TODO DELETE THIS once server response is correct
      // this.events.publish('boat:registered', this.boat);
      // this.navCtrl.pop();
    });
  }

}
