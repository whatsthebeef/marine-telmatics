import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
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
    public events: Events, 
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
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
      const alert = this.alertCtrl.create({
        title: 'Boat Registration Failed',
        subTitle: 'Ensure you haven\'t entered reasonable values and try again',
        buttons: ['Dismiss']
      });
      alert.present();
  });
}

}
