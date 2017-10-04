import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { StatusPage } from '../status/status';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  register(){
    this.navCtrl.push( RegisterPage )
  }

  status(){
    this.navCtrl.setRoot( StatusPage )
  }

}
