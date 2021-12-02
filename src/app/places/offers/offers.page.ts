import { Component, OnDestroy, OnInit } from '@angular/core';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { IonItemSliding, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  private placesSub: Subscription;
  filterTerm: string;
  isLoading = false;
  delayInMilliseconds = 4000;

  constructor(
    private placesService: PlacesService, 
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService
    
    ) 
    
    { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
    
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  async onCall(slidingItem: IonItemSliding) {
    
    const alert = await this.alertCtrl.create({
       
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Pretend like this is gonna call the person after you click call.',
      buttons: ['Cancel', 'Call']
    });
    await alert.present();
    
}  

  async onMail(slidingItem: IonItemSliding) {
    const alert = await this.alertCtrl.create({
       
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Pretend like this is gonna email the person after you click email.',
      buttons: ['Cancel', 'Email']
    });
    await alert.present();
    
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

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }



}
