import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RegisterBoatPage } from '../register-boat/register-boat';
import { HomePage } from '../home/home'
import { LimitsPage } from '../limits/limits';
import { MonitoredItemsPage } from '../monitored-items/monitored-items';
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
  homePage: any = HomePage;
  interval: any; 
  pollPeriod = 60000; 
  showMap = false; 

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public backend: FirebaseBackendProvider, 
    public events: Events
  ) {
  }

  ionViewDidLoad() {
    this.events.subscribe('boat:register_boat', () => {
      this.registerBoat();
    });
    this.events.subscribe('boat:registered', boat => {
      this.boats.push(boat);
    });
    this.events.subscribe('boat:limits_set', boat => {
      this.boats.forEach((b, i) => {
        if(b.IMEI === boat.IMEI) {
          this.boats[i] = b;
        }
      });
    });
    this.userId = this.navParams.get('user_id') || this.userId; 
    this.loadData(true);
    this.interval = setInterval(() => {
      this.loadData(false);
    }, this.pollPeriod);
  }

  ionViewWillLeave() {
    clearInterval(this.interval);
  }

  setLimits(boat) {
    this.navCtrl.push(LimitsPage, {boat:boat});
  }

  setMonitoredItems(boat) {
    this.navCtrl.push(MonitoredItemsPage, {boat:boat});
  }

  registerBoat() {
    this.navCtrl.push(RegisterBoatPage, {user_id:this.userId});
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
      if(boat['geomonitoring'] === 0) {
        return;
      }  
      if(boat['lat'] && boat['long']) {
        this.showMap = true;
      }
      let latLng = new google.maps.LatLng(parseFloat(boat['lat']), parseFloat(boat['long'])); 
      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: boat.name
      });
      var infowindow = new google.maps.InfoWindow({
        content: '<p><strong>' + boat.name + '</strong></p><p>longitude ' + boat['long'] + '</p><p>latitude ' + boat['lat'] + '</p>'
      });
      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
    });
  }

  loadData(firstLoad:boolean) {
    this.backend.user(this.userId)
      .then(result => {
        this.boats = result['boats'] || [];
        if(this.boats.length > 0) {
          this.initMap();
        }
      }, err => {
        this.boats = this.navParams.get('boats');
        if(!this.boats) {
          this.navCtrl.setPages([this.homePage]);
          if(firstLoad) {
            const alert = this.alertCtrl.create({
              title: 'Failed To Load Data',
              subTitle: 'Check your connection and try sign in again',
              buttons: ['Dismiss']
            });
            alert.present();
          }
        } else {
          this.initMap();
        }
      });
  }
}
