import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LimitsPage } from './limits';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    LimitsPage
  ],
  imports: [
    IonicPageModule.forChild(LimitsPage),
    DirectivesModule
  ],
})
export class LimitsPageModule {}
