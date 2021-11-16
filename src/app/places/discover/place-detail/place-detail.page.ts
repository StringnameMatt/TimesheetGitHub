import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { JobsService } from '../job-list.service';
import { Jobs } from '../jobs.model';
import { BookingService } from '../../../bookings/booking.service';
import { Place } from '../../place.model';



@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  job: Jobs;
  place: Place;
  showIcon = 'star-outline';
  private jobSub: Subscription

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private jobService: JobsService,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.jobSub = this.jobService
      .getJob(paramMap
        .get('placeId')).subscribe(job => {
        // this.place = place;
      this.job = job;
      });
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
