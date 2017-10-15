import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonitoredItemsPage } from './monitored-items';
import { MonitoredItemSegment } from './monitored-item-segment.component';

@NgModule({
  declarations: [
    MonitoredItemsPage, 
    MonitoredItemSegment
  ],
  imports: [
    IonicPageModule.forChild(MonitoredItemsPage),
  ], 
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MonitoredItemsModule {}
