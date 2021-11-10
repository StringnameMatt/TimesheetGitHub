import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  loadedJobs: Place[];
  listedLoadedJobs: Place[];
  jobs: Place[];
  private placesSub: Subscription;
  private jobSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
   this.jobSub = this.placesService.jobs.subscribe(jobs => {
      this.loadedJobs = jobs;
      this.listedLoadedJobs = this.loadedJobs.slice(1);
   });
    
  }

  /* ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      // this.jobs = places;
      this.loadedPlaces = places;
      // this.jobs = this.placesService.jobs;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
    
  } */

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

  ngOnDestroy() {
    if (this.jobSub) {
      this.jobSub.unsubscribe();
    }
  }
}
