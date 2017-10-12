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
      'boat.battwarninghigh': [
        '',
        Validators.compose(
          [ Validators.min( 0.0 ),
            Validators.max( 100.0 )
          ]
        )],
      'boat.battwarninglow': [
        '',
        Validators.compose(
          [ 
            Validators.min( 0.0 ),
            Validators.max( 100.0 )
          ]
        )],
      'boat.bilgepumpfaulttime': [
        '',
        Validators.compose(
          [
          Validators.max( 60 )
          ]
        )],
      'boat.georadius': [
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
    this.boat = this.navParams.get('boat') || {};
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

  // TODO: DRY -> how to make this common to all pages?
  clsExp(control:string){
    return {
      'hidden': !this.limitsForm.controls[control].touched ||
        this.limitsForm.controls[control].valid,
      'error-hint': !this.limitsForm.controls[control].valid &&
        this.limitsForm.controls[control].touched
    }
  }

}
