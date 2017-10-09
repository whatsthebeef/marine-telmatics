import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';

@IonicPage()
@Component({
  selector: 'page-limits',
  templateUrl: 'limits.html',
})
export class LimitsPage {

  boat = {};

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public backend: FirebaseBackendProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LimitsPage');
    this.boat = this.navParams.get('boat') || this.boat;
  }

  setLimits(){
    this.backend.setLimits(this.boat).then(changes => {
      for(key in changes) {
        this.boat[key] = changes[key];
      }
      return this.navParams.get('callback')(this.boat);
    }, err => {
      console.log(err);
    });
  }

}
