import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionSheetController, AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { RequestsService } from './requests.service';
import { Subscription } from 'rxjs';
import { Request } from './request.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.page.html',
  styleUrls: ['./leaverequest.page.scss'],
})
export class LeaverequestPage implements OnInit, OnDestroy {
  request: Request[];
  requestApproval: 'y';
  listedLoadedRequests: Request[];
  loadedRequests: Request[];
  router: any;
  private requestSub: Subscription;
  relevantRequests: Request[];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private requestsService: RequestsService,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.requestSub = this.requestsService.requests.subscribe(requests => {
      this.loadedRequests = requests;
      this.relevantRequests = this.loadedRequests;
      this.listedLoadedRequests = this.relevantRequests.slice(0);
   });

  }



  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantRequests = this.loadedRequests;
      this.listedLoadedRequests = this.relevantRequests.slice(0);
    } else {
      this.relevantRequests = this.loadedRequests.filter(
        request => request.approval !== 'y'
      );
      this.listedLoadedRequests = this.relevantRequests.slice(0);
    }
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

  onDelete(slidingRequest: IonItemSliding) {
    console.log("I deleted it.");
    slidingRequest.close();
  }

  ngOnDestroy() {
    if (this.requestSub) {
      this.requestSub.unsubscribe();
    }
  }

/* onBookPlace() {
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
      }); }*/
  
  }
