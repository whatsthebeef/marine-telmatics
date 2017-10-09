import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPageModule } from '../pages/register/register.module';
import { StatusPageModule } from '../pages/status/status.module';
import { LimitsPageModule } from '../pages/limits/limits.module';
import { RegisterBoatPageModule } from '../pages/register-boat/register-boat.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseBackendProvider } from '../providers/firebase-backend/firebase-backend';
import { HttpClientModule } from '@angular/common/http';

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
    RegisterPageModule,
    RegisterBoatPageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseBackendProvider
  ]
})
export class AppModule {}
