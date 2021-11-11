import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../request.model';


@Component({
  selector: 'app-leaverequest-item',
  templateUrl: './leaverequest-item.component.html',
  styleUrls: ['./leaverequest-item.component.scss'],
})
export class LeaverequestItemComponent implements OnInit {
  
  @Input() request: Request;
  

  constructor() { }

  ngOnInit() {
  }

  getDummyDate() {
    return new Date;
  }


}
