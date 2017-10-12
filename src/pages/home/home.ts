import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { StatusPage } from '../status/status';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {};
  
  authForm : FormGroup;
  constructor(public navCtrl: NavController,
              public backend: FirebaseBackendProvider,
              private fb: FormBuilder) {
    this.authForm = this.fb.group({
      'user.email' : [
        '',
        Validators.compose(
          [ Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30)
          ]
        )],
      'user.password': [
        '',
        Validators.compose(
          [ Validators.required,
            Validators.minLength(6)
          ]
        )]
    });
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }

  signIn() {
    this.backend.login(this.user)
      .then(result => {
        this.navCtrl.setRoot(StatusPage, result)
      }, err => {
        console.log(err);
 
      });
  }

  // TODO: DRY -> how to make this common to all pages?
  clsExp(control:string){
    return {
      'hidden': !this.authForm.controls[control].touched ||
        this.authForm.controls[control].valid,
      'error-hint': !this.authForm.controls[control].valid &&
        this.authForm.controls[control].touched
    }
  }
}
