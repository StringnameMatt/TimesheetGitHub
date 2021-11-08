import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../place.model';

@Component({
  selector: 'app-leaverequest-item',
  templateUrl: './leaverequest-item.component.html',
  styleUrls: ['./leaverequest-item.component.scss'],
})
export class LeaverequestItemComponent implements OnInit {
  @Input() request: Place;

  constructor() { }

  ngOnInit() {
  }

  getDummyDate() {
    return new Date;
  }

}
