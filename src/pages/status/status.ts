import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  @ViewChild('map') mapElement;  
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
    this.initMap();
  }

  initMap() {

    let latLng = new google.maps.LatLng(58.6366911,-3.0827025); 

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
