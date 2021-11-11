import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-job-site',
  templateUrl: './new-job-site.page.html',
  styleUrls: ['./new-job-site.page.scss'],
})
export class NewJobSitePage implements OnInit, OnDestroy {
  place: Place;
  job: Place;
  form: FormGroup;
  @ViewChild('f', { static: true }) forms: NgForm;
  private jobSub: Subscription;
  // private jobService: PlacesService;

  constructor(
    private jobsService: PlacesService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      this.jobSub = this.jobsService
      .getJob(paramMap.get('placeId'))
      .subscribe(job => {
        this.job = job;
      

      this.form = new FormGroup({
        fName: new FormControl(this.job.firstName, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        phoneNumber: new FormControl(this.job.phoneNumber, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        emailAddress: new FormControl(this.job.emailAddress, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        locationAddress: new FormControl(this.job.payGroup, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        businessType: new FormControl(this.job.description, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        
    });
  });
});
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.jobsService.addJob(
      this.form.value.fName,
      this.form.value.phoneNumber,
      this.form.value.emailAddress,
      this.form.value.locationAddress,
      this.form.value.businessType,
      this.form.value.jobTitle
      
    )
    
    // this.navCtrl.navigateBack('/jobs/tabs/offers');
    this.router.navigate(['/places/tabs/discover']);
    this.presentToast();

  }

  ngOnDestroy() {
    if (this.jobSub) {
      this.jobSub.unsubscribe();
    }
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Site Created!',
      duration: 2000,
      position: "middle",
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }

}
