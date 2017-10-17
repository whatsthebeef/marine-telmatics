import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';
import { ValidationMessageDirective } from '../../directives/validation-message/validation-message';

@IonicPage()
@Component({
  selector: 'page-register-boat',
  templateUrl: 'register-boat.html',
})
export class RegisterBoatPage {

  boat = {};
  userId = '';
  registerBoatForm: FormGroup;
  checked = false;

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public backend: FirebaseBackendProvider, 
    public loadingCtrl: LoadingController, 
    public events: Events, 
    public alertCtrl: AlertController, 
    private fb: FormBuilder) {
    this.registerBoatForm = this.fb.group({
      'boat.IMEI': [ '', Validators.compose( [ Validators.required ]) ], 
      'boat.name': [ '', Validators.compose( [ Validators.required ]) ], 
      'boat.type': [ '', Validators.compose( [ ]) ], 
      'boat.marina': [ '', Validators.compose( [ ]) ], 
      'boat.model': [ '', Validators.compose( [ ]) ], 
      'boat.manufacturer': [ '', Validators.compose( [ ]) ], 
      'boat.length': [ '', Validators.compose( [ ]) ], 
      'boat.beam': [ '', Validators.compose( [ ]) ], 
      'boat.depth': [ '', Validators.compose( [ ]) ], 
      'boat.locationcontactnumber': [ '', Validators.compose( [ ]) ]
    });
  }

  ionViewDidLoad() {
    this.userId = this.navParams.get('user_id'); 
    if(!this.userId) {
      throw Error();
    }
    this.registerBoatForm.valueChanges.subscribe(data => {
      this.checked = false;
    });
  }

  registerBoat() {
    if(!this.validate()) {
      return;  
    }
    const loading = this.loadingCtrl.create({
      content: 'Registering boat. Please wait...'
    });
    loading.present();
    this.backend.registerBoat(this.boat, this.userId).then(boats => {
      loading.dismiss();
      this.events.publish('boat:registered', this.boat);
      this.navCtrl.pop();
    }, err => {
      console.error(err);
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Boat Registration Failed',
        subTitle: 'Check your connection and ensure you have entered reasonable values and try again',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  validate() {
    if(this.registerBoatForm.valid) {
      return true;
    } else {
      this.checked = true; 
      return false;
    }
  }

}
