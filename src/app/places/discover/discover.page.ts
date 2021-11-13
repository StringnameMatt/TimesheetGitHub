import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { JobsService } from './job-list.service';
import { Jobs } from './jobs.model';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedJobs: Jobs[];
  listedLoadedJobs: Jobs[];
  jobs: Jobs[];
  private jobSub: Subscription;
  filterJobs: string;
  

  constructor(
    private jobsService: JobsService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
   this.jobSub = this.jobsService.jobs.subscribe(jobs => {
      this.loadedJobs = jobs;
      this.listedLoadedJobs = this.loadedJobs.slice(0);
   });
    
  }


  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  

  ngOnDestroy() {
    if (this.jobSub) {
      this.jobSub.unsubscribe();
    }
  }

}
