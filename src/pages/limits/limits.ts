import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, LoadingController } from 'ionic-angular';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidationMessageDirective } from '../../directives/validation-message/validation-message';

@IonicPage()
@Component({
  selector: 'page-limits',
  templateUrl: 'limits.html',
})
export class LimitsPage {

  boat = {};
  limitsForm : FormGroup;
  checked = false;

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public backend: FirebaseBackendProvider, 
    public loadingCtrl: LoadingController, 
    public events: Events,
    public alertCtrl: AlertController,
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
    this.limitsForm.valueChanges.subscribe(data => {
      this.checked = false;
    })
  }

  setLimits(){
    if(!this.validate()) {
      return;  
    }
    const loading = this.loadingCtrl.create({
      content: 'Setting limits. Please wait...'
    });
    loading.present();
    this.backend.setLimits(this.boat).then(changes => {
      loading.dismiss();
      this.checked = false; 
      for(let key in changes) {
        this.boat[key] = changes[key];
      }
      this.events.publish('boat:limits_set', this.boat);
      this.navCtrl.pop();
    }, err => {
      console.log(err);
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Update Failed',
        subTitle: 'Failed to update the threshold values, please check all values are reasonable and try again',
        buttons: ['Dismiss']
      });
      alert.present()
    });
  }

  validate() {
    if(this.limitsForm.valid) {
      return true;
    } else {
      this.checked = true; 
      return false;
    }
  }

}
