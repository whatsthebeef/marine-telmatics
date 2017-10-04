import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LimitsPage } from './limits';

@NgModule({
  declarations: [
    LimitsPage,
  ],
  imports: [
    IonicPageModule.forChild(LimitsPage),
  ],
})
export class LimitsPageModule {}
