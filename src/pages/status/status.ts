import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  @ViewChild('map') mapElement;  
  map: any;
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
    console.log('ionViewDidLoad StatusPage');
    this.backend.boat('861510039282476').then(status => {
      // this.initMap(58.6366911,-3.0827025);
      console.log(status);
      this.boat = status;
      this.initMap(boat.lat, boat.long);
    }, err => {
      console.log(err);
    });
  }

  initMap(lat, lng) {

    let latLng = new google.maps.LatLng(lat, lng); 

    let mapOptions = {
      center: latLng, 
      zoom: 10, 
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Your Boat'
    });

  }
}
