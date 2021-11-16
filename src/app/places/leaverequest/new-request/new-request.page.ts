import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';
import { RequestsService } from '../requests.service';
import { Request } from '../request.model';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.page.html',
  styleUrls: ['./new-request.page.scss'],
})
export class NewRequestPage implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) forms: NgForm;
  form: FormGroup;
  loadedRequest: Request[];
  requestId: Request[];
  request: Request;
  
  private requestSub: Subscription;

  constructor(
    private requestsService: RequestsService,
    private route: ActivatedRoute, 
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/leaverequest');
        return;
      }
      this.requestSub = this.requestsService
      .getRequest(paramMap.get('placeId'))
      .subscribe(request => {
        this.request = request;

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
      }),

    });
  });
});
  }

  ngOnDestroy() {
    if (this.requestSub) {
      this.requestSub.unsubscribe();
    }
  }


  onSubmitRequest() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create( {
      message: 'Creating Request...'
    }).then(loadingEl => {
      loadingEl.present();
      this.requestsService.addRequest(
      this.form.value.name,
      this.form.value.type,
      this.form.value.description,
      this.form.value.approval,
      new Date(this.form.value.dateFrom),
      new Date(this.form.value.dateTo)
    )
    .subscribe(() => {
      loadingEl.dismiss();
      this.form.reset();
      this.router.navigate(['/places/tabs/leaverequest'])
      this.presentToast();
    })

  })
}
    
    
    
    
    /* if (!this.form.valid || !this.datesValid) {
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
   */

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
