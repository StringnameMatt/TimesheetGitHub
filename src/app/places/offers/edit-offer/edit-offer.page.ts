import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
      this.form = new FormGroup({
        fName: new FormControl(this.place.firstName, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        lName: new FormControl(this.place.lastName, {
          updateOn: 'change',
          validators: [Validators.required, Validators.maxLength(180)]
        }),
        phoneNumber: new FormControl(this.place.phoneNumber, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        emailAddress: new FormControl(this.place.emailAddress, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        jobTitle: new FormControl(this.place.description, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        payGroup: new FormControl(this.place.payGroup, {
          updateOn: 'change',
          validators: [Validators.required]
        })
      });  
    });
      
  });

    
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Changes saved',
      duration: 2000,
      position: "middle",
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }

  onUpdateEmployee() {
    if (!this.form.valid) {
      return;
    }
    console.log(
      { 
      requestData: {
      firstName: this.form.value['fName'],
      lastName: this.form.value['lName'],
      phoneNumber: this.form.value['phoneNumber'],
      emailAddress: this.form.value['emailAddress'],
      jobTitle: this.form.value['jobTitle'],
      payGroup: this.form.value['payGroup']
      }
    });
    this.navCtrl.navigateBack('/places/tabs/offers');
    this.presentToast();
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
