import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { JobsService } from '../job-list.service';
import { Jobs } from '../jobs.model';
import { Place } from '../../place.model';
import { AuthService } from '../../../auth/auth.service';
import { MapModalComponent } from '../../../shared/pickers/map-modal/map-modal.component';




@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  job: Jobs;
  place: Place;
  showIcon = 'star-outline';
  private jobSub: Subscription;
  isFavorite =  false;
  isLoading = false;
  

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private jobService: JobsService,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.isLoading = true;
      this.jobSub = this.jobService
        .getJob(paramMap
        .get('placeId'))
        .subscribe(job => {
        this.job = job;
        this.isLoading = false;
      }, error => {
        this.alertCtrl
        .create({
          header: 'An error occurred!', 
          message: 'Could not load job site.', 
          buttons: [{text: 'Okay', 
          handler: () => {
          this.router.navigate(['/place/tabs/discover']);
        }
      }
    ]
  })
  .then(alertEl => {
    alertEl.present();
  });
        }
        );
    });
}

  onAddFavorite() {
      if (this.showIcon === 'star-outline') {
        this.showIcon = 'star';
        this.presentAddedToast();
         
      } else {
        this.showIcon = 'star-outline';
        
      }
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

    
   onDeleteJob(jobId: string) {
    this.loadingCtrl
    .create({message: 'Deleting...'})
    .then(loadingEl => {
      loadingEl.present();
      this.jobService
      .deleteJob(jobId)
      .subscribe(() => {
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/places/tabs/discover');
      })
    })
  }

  onShowFullMap() {
    this.modalCtrl.create({component: MapModalComponent, componentProps: {
      center: { lat: this.job.location.lat, lng: this.job.location.lng },
      selectable: false,
      closeButtonText: 'Close',
      title: this.job.location.address
    },
  })
    .then(modalEl => {
      modalEl.present();
    })
  }
   

    

  async presentAddedToast() {
    const toast = await this.toastCtrl.create({
      message: 'Favorite Added',
      duration: 2000,
      position: "middle",
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }

  ngOnDestroy() {
    if (this.jobSub) {
      this.jobSub.unsubscribe();
    }
  }

}
