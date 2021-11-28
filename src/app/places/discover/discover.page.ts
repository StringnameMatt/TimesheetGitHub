import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { JobsService } from './job-list.service';
import { Jobs } from './jobs.model';
import { AuthService } from '../../auth/auth.service';


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
  isLoading = false;
  

  constructor(
    private jobsService: JobsService,
    private menuCtrl: MenuController,
    private authService: AuthService,
  ) {}

  ngOnInit() {
   this.jobSub = this.jobsService.jobs.subscribe(jobs => {
      this.loadedJobs = jobs;
      this.listedLoadedJobs = this.loadedJobs.slice(0);
   });
    
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.jobsService.fetchJobs().subscribe(() => {
      this.isLoading = false;
    });
  }

  isAdmin(adminResult: boolean) {
    if (this.authService.userId === "admin") {
        adminResult = true;
        return adminResult; 
    } else {
      adminResult = false;
      return adminResult;
    }
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
