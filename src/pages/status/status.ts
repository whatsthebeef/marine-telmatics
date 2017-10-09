import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterBoatPage } from '../register-boat/register-boat';
import { LimitsPage } from '../limits/limits';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  @ViewChild('map') mapElement;  
  map: any;
  userId = '';
  boats = [];
  /*
  boats = [{
    IMEI: '',
    antitheftloopalarm: 0,
    geofencedmonitoring: 0,
    geofencedradius: '',
    shorepower: 0,
    bilgemonitoring: 0,
    bilgepumpmarktime: 0,
    bilgepumpspacetime: 0,
    ignitionmonitoring: 0,
    battwarningthreshold: '',
    battalarmthreshold: '',
    vbatmonitoring: 0,
    tempwarninghigh: '',
    tempwarninglow: '',
    refreshrate: 0,
    batt: '12',
    battfault: 0,
    bilgepumpfault: 0,
    engine: '0',
    lat: '13.123',
    long:'41.324',
    geofencedfault: 0,
    geofencedfaultlonglat: '',
    groundspeed: '',
    shorefault: 0,
    temperature: ''
  }];
  */

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public backend: FirebaseBackendProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
    this.boats = this.navParams.get('boats') || [];
    this.userId = this.navParams.get('user_id') || this.userId; 
    if(this.boats.length > 0) {
      this.initMap();
    }
  }

  setLimits(boat) {
    this.navCtrl.push(LimitsPage, {boat:boat, callback:this.onLimitsSet});
  }

  onLimitsSet(boat) {
    this.boats.forEach((b, i) => {
      if(b.IMEI === boat.IMEI) {
        this.boats[i] = b;
      }
    });
  }

  registerBoat() {
    this.navCtrl.push(RegisterBoatPage, {user_id:this.userId, callback:this.onBoatRegistered});
  }

  onBoatRegistered(boat) {
    this.boats.push(boat);
  }

  initMap() {

    let center = new google.maps.LatLng(parseFloat(this.boats[0]['lat']), parseFloat(this.boats[0]['long'])); 

    let mapOptions = {
      center: center, 
      zoom: 5, 
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.boats.forEach(boat => {
      let latLng = new google.maps.LatLng(parseFloat(boat['lat']), parseFloat(boat['long'])); 
      new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'Your Boat'
      });
    });
  }
}
