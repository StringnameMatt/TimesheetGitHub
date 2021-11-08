import { Component, OnInit } from '@angular/core';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { IonItemSliding, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  places: Place[];
  jobs: Place[];
  listedLoadedPlaces: Place[];

  constructor(
    private placesService: PlacesService, 
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.places = this.placesService.places;
    this.jobs = this.placesService.jobs;
    this.listedLoadedPlaces = this.places.slice(1);
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

  }


