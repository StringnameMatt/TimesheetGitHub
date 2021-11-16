import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RequestsService } from '../requests.service';
import { Request } from '../request.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leaverequest-view',
  templateUrl: './leaverequest-view.page.html',
  styleUrls: ['./leaverequest-view.page.scss'],
})
export class LeaverequestViewPage implements OnInit {
  requestId: Request[];
  request: Request;
  private requestsSub: Subscription;

  constructor(
    private requestsService: RequestsService, 
    private route: ActivatedRoute, 
    private navCtrl: NavController,
    ) {
    
   }

  ngOnInit() {
    this.requestsSub = this.requestsService.requests.subscribe(requests => {
      this.requestId = requests;
    });
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/leaverequest');
        return;
      }
      this.requestsService.getRequest(paramMap.get('placeId')).subscribe(request => {
        this.request = request;
      });
    });
  }


}
