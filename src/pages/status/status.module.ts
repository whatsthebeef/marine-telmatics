import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusPage } from './status';
import { LimitsPageModule } from '../limits/limits.module';
import { MonitoredItemsModule } from '../monitored-items/monitored-items.module';

@NgModule({
  declarations: [
    StatusPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusPage), 
    LimitsPageModule, 
    MonitoredItemsModule, 
  ],
})
export class StatusPageModule {}
