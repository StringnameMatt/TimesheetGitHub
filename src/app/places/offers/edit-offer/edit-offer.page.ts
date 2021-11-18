import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';

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
  placeId: string;
  form: FormGroup;
  private placeSub: Subscription;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeId = paramMap.get('placeId');
      this.isLoading = true; 
      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe(place => {
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
      this.isLoading = false;  
    }, error => {
        this.alertCtrl.create({
        header: 'An error occurred!', 
        message: 'Oops! Employee could not be fetched. Please try again later.', 
        buttons: [{text: 'Okay', handler: () => {
          this.router.navigate(['/places/tabs/offers'])
        }}]
      }).then(alertEl => {
        alertEl.present();
      });
    }
    
    );
      
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
    this.loadingCtrl.create({
      message: 'Updating Employee...'
    }).then(loadingEl => {
      loadingEl.present();
      this.placesService
        .updateEmployee(
          this.place.id, 
          this.form.value.fName, 
          this.form.value.lName,
          this.form.value.phoneNumber,
          this.form.value.emailAddress,
          this.form.value.jobTitle,
          this.form.value.payGroup
        )
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/offers']);
          this.presentToast();
      });
    })
    
    /* console.log(
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
    this.presentToast(); */
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
