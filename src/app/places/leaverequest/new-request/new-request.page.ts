import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.page.html',
  styleUrls: ['./new-request.page.scss'],
})
export class NewRequestPage implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) forms: NgForm;
  form: FormGroup;
  place: Place[];
  loadedPlace: Place[];
  requestId: Place[];
  job: Place;
  private placeSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute, 
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.requestId = this.placesService.requests;
    this.placeSub = this.placesService.places.subscribe(place => {
      this.place = place;
    });
    this.loadedPlace = this.place.slice(0);
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      type: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }


  onSubmitRequest() {
    if (!this.form.valid || !this.datesValid) {
      return;
    }
    console.log(
      { 
      requestData: {
      leaveType: this.form.value['type'],
      name: this.form.value['name'],
      description: this.form.value['description'],
      dateFrom: this.form.value['dateFrom'],
      dateTo: this.form.value['dateTo']
      }
    });
    this.navCtrl.navigateBack('/places/tabs/leaverequest');
    this.presentToast();
  }

  datesValid() {
    const startDate = new Date(this.form.value['dateFrom']);
    const endDate = new Date(this.form.value['dateTo']);
    return endDate > startDate;
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Request sent!',
      duration: 2000,
      position: "middle",
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }
  

}
