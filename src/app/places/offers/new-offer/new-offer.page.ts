import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  @ViewChild('f', { static: true }) forms: NgForm;
  private placeSub: Subscription;
  isLoading = false;

  constructor(
    private placesService: PlacesService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    
    private router: Router) { }

  ngOnInit() {
    
      

      this.form = new FormGroup({
         fName: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        lName: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required, Validators.maxLength(180)]
        }),
        phoneNumber: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        emailAddress: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        jobTitle: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        payGroup: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
          
        }),
        
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create( {
      message: 'Creating employee...'
    }).then(loadingEl => {
      loadingEl.present();
      this.placesService
      .addEmployee(
        this.form.value.fName,
        this.form.value.lName,
        +this.form.value.phoneNumber,
        this.form.value.emailAddress,
        this.form.value.jobTitle,
        this.form.value.payGroup
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/offers']);
        this.presentToast();
      })
      
      // this.navCtrl.navigateBack('/places/tabs/offers');
      
    })
    

  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Employee Created!',
      duration: 2000,
      position: "middle",
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }

}
