import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-leaverequest-view',
  templateUrl: './leaverequest-view.page.html',
  styleUrls: ['./leaverequest-view.page.scss'],
})
export class LeaverequestViewPage implements OnInit {
  requestId: Place[];
  job: Place;

  constructor(private placesService: PlacesService, private route: ActivatedRoute, private navCtrl: NavController) {
    
   }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/leaverequest');
        return;
      }
      this.job = this.placesService.getRequest(paramMap.get('placeId'));
    });
    this.requestId = this.placesService.requests;
  }

}
