import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss']
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: Place;
  job: Place;
  isLoading = false;
  private placeSub: Subscription;
  

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.isLoading = true;
      this.placeSub = this.placesService
        .getPlace(paramMap
        .get('placeId'))
        .subscribe(place => {
        this.place = place;
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create({header: 'An error occurred!', message: 'Could not load employee.', buttons: [{text: 'Okay', handler: () => {
          this.router.navigate(['/place/tabs/offers']);
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

  isAdmin(adminResult: boolean) {
    if (this.authService.userId === "admin") {
        adminResult = true;
        return adminResult; 
    } else {
      adminResult = false;
      return adminResult;
    }
 } 

  onDeleteEmployee(employeeId: string) {
    this.loadingCtrl
    .create({message: 'Deleting...'})
    .then(loadingEl => {
      loadingEl.present();
      this.placesService
      .deleteEmployee(employeeId)
      .subscribe(() => {
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/places/tabs/offers');
      })
    })
  }

  /* isAdmin(adminResult: boolean) {
    if (this.authService.userId === "admin") {
        adminResult = true;
        return adminResult;
    } else {
      adminResult = false;
      return adminResult;
    }
 } */

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
