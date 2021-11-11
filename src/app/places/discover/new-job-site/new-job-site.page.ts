import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsService } from '../job-list.service';
import { Jobs } from '../jobs.model';

@Component({
  selector: 'app-new-job-site',
  templateUrl: './new-job-site.page.html',
  styleUrls: ['./new-job-site.page.scss'],
})
export class NewJobSitePage implements OnInit, OnDestroy {
  place: Place;
  job: Jobs;
  form: FormGroup;
  @ViewChild('f', { static: true }) forms: NgForm;
  private jobSub: Subscription;
  // private jobService: PlacesService;

  constructor(
    private jobsService: JobsService,
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
        bName: new FormControl(this.job.businessName, {
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
        businessType: new FormControl(this.job.businessType, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        businessLocation: new FormControl(this.job.jobAddress, {
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
      this.form.value.bName,
      this.form.value.phoneNumber,
      this.form.value.emailAddress,
      this.form.value.businessType,
      this.form.value.businessLocation,
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
