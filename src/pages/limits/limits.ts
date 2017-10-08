import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';

@IonicPage()
@Component({
  selector: 'page-limits',
  templateUrl: 'limits.html',
})
export class LimitsPage {

  boat = {
    IMEI: "",
    antitheftloopalarm: 0,
    geofencedmonitoring: 0,
    geofencedradius: "",
    shorepower: 0,
    bilgemonitoring: 0,
    bilgepumpmarktime: 0,
    bilgepumpspacetime: 0,
    ignitionmonitoring: 0,
    battwarningthreshold: "",
    battalarmthreshold: "",
    vbatmonitoring: 0,
    tempwarninghigh: "",
    tempwarninglow: "",
    refreshrate: 0,
    batt: "",
    battfault: 0,
    bilgepumpfault: 0,
    engine: "0",
    lat: "",
    long:"",
    geofencedfault: 0,
    geofencedfaultlonglat: "",
    groundspeed: "",
    shorefault: 0,
    temperature: ""
  }
  
  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               public backend: FirebaseBackendProvider
             ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LimitsPage');
  }

  setLimits(){
    this.backend.setLimits( this.boat ).then((result) => {
        console.log('success!');
      }, (err) => {
        console.log(err);
      });
  }

}
