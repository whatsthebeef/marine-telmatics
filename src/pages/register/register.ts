import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusPage } from '../status/status';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  status(){
    this.navCtrl.setRoot(StatusPage)
  }

  register(){
    this.backend.register({ email: this.email, password: this.password })
      .then((result) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      });
  }

}
