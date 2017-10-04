import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPageModule } from '../pages/register/register.module';
import { StatusPageModule } from '../pages/status/status.module';
import { LimitsPageModule } from '../pages/limits/limits.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StatusPageModule, 
    LimitsPageModule, 
    RegisterPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
