import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.page.html',
  styleUrls: ['./leaverequest.page.scss'],
})
export class LeaverequestPage implements OnInit {
  place: Place[];
  request: Place[];
  listedLoadedRequests: Place[];
  router: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private placesService: PlacesService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.request = this.placesService.requests;
    this.listedLoadedRequests = this.request.slice(0);
  }

  onBookPlace() {
    this.actionSheetCtrl
    .create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModale('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModale('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    .then(actionSheetEl => {
      actionSheetEl.present();
    });
  }
  
  openBookingModale(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          console.log('Request Sent!');
        }
      });
  }

  async onViewLeave(slidingEl: IonItemSliding) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Are you sure you would like to delete your request?',
      buttons: ['Cancel', 'Delete']
    });
    await alert.present();
    slidingEl.close();
  }  


  }
