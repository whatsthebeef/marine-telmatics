import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { StatusPage } from '../pages/status/status';
import { LimitsPage } from '../pages/limits/limits';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  statusPage: any = StatusPage;

  pages = {};
  registerBoatDisabled = true;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public events: Events,
    public splashScreen: SplashScreen) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages['Sign out'] = HomePage;
    this.pages['Status'] = StatusPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setPages([this.pages[page]]);
  }

  registerBoat() {
    this.events.publish('boat:register_boat');
  }
}
