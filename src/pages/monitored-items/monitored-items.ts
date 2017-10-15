import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';
import { MonitoredItemSegment } from './monitored-item-segment.component';

@IonicPage()
@Component({
  selector: 'page-monitored-items',
  templateUrl: 'monitored-items.html',
})
export class MonitoredItemsPage {

  boat = {};
  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public backend: FirebaseBackendProvider, 
    public events: Events,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    this.boat = this.navParams.get('boat') || {};
    this.events.subscribe('boat:monitored_item_changed', (name, value, label) => {
      const loading = this.loadingCtrl.create({
        content: 'Logging in. Please wait...'
      });
      loading.present();
      let item = {};
      item[name] = value;
      this.backend.setMonitoredItems(item).then(result => {
        loading.dismiss();
        console.log(item);
        this.boat[name] = value;
      }, err => {
        console.log(err);
        loading.dismiss();
        this.boat[name] === 0 ? this.boat[name] = 1 : this.boat[name] = 0;
        const alert = this.alertCtrl.create({
          title: 'Couldn\'t set ' + label,
          subTitle: 'Failed to update the ' + label + ', please check your internet connection and try again',
          buttons: ['Dismiss']
        });
        alert.present()
      });
    });
  }


}
