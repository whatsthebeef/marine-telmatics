import { Input, Component } from '@angular/core';
import { FirebaseBackendProvider } from '../../providers/firebase-backend/firebase-backend';
import { AlertController, NavController, Events } from 'ionic-angular';

@Component({
  templateUrl: 'monitored-item-segment.component.html',
  selector: 'monitored-item-segment'
})
export class MonitoredItemSegment {

  @Input() label :string;
  @Input() itemName :string;

  _item :string;

  @Input() set item(value: number) {
    this._item = value + "";
  }

  constructor(
    public events: Events
  ) {
  }

  ngOnInit() {
  }

  onSelect(value) {
    this.events.publish('boat:monitored_item_changed', this.itemName, parseInt(this._item), this.label);
  }

}
