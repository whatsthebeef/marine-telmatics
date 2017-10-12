import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterBoatPage } from './register-boat';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    RegisterBoatPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterBoatPage),
    DirectivesModule
  ],
})
export class RegisterBoatPageModule {}
