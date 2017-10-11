import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-limits',
  templateUrl: 'limits.html',
})
export class LimitsPage {

  boat = {};
  limitsForm : FormGroup;
  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               public backend: FirebaseBackendProvider, 
               public events: Events,
               private fb: FormBuilder
             ) {
    this.limitsForm = this.fb.group({
      'boat.battwarningthreshold': [
        '',
        Validators.compose(
          [ Validators.min( 11.7 ),
            Validators.max( 14.8 )
          ]
        )],
      'boat.battalarmthreshold': [
        '',
        Validators.compose(
          [ Validators.required
          ]
        )],
      'boat.bilgepumpmarktime': [
        '',
        Validators.compose(
          [
          Validators.max( 60 )
          ]
        )],
      'boat.geofencedradius': [
        '',
        Validators.compose(
          [ Validators.pattern(new RegExp("[0-9]+")) ]
        )],
      'boat.geofencedfault': [
        '',
        Validators.compose(
          [ Validators.pattern(new RegExp("[0-9]+")) ]
        )]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LimitsPage');
    //this.boat = this.navParams.get('boat') || {};
  }

  setLimits(){
    this.backend.setLimits(this.boat).then(changes => {
      for(let key in changes) {
        this.boat[key] = changes[key];
      }
      this.events.publish('boat:limits_set', this.boat);
      this.navCtrl.pop();
    }, err => {
      console.log(err);
      // TODO Remove
      // this.events.publish('boat:limits_set', this.boat);
      // this.navCtrl.pop();
    });
  }

}
