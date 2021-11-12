import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { JobsService } from '../job-list.service';
import { Jobs } from '../jobs.model';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.page.html',
  styleUrls: ['./edit-job.page.scss'],
})
export class EditJobPage implements OnInit, OnDestroy {
  job: Jobs;
  form: FormGroup;
  private jobSub: Subscription;
  

  constructor(
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
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
          validators: [Validators.required, Validators.maxLength(180)]
        }),
        emailAddress: new FormControl(this.job.emailAddress, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        businessType: new FormControl(this.job.businessType, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        jobAddress: new FormControl(this.job.jobAddress, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        imageUrl: new FormControl(this.job.imageUrl, {
          updateOn: 'change',
          validators: [Validators.required]
        })
      });  
    });
      
  });
  }


  onUpdateJob() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating Employee...'
    }).then(loadingEl => {
      loadingEl.present();
      this.jobsService
        .updateJob(
          this.job.id, 
          this.form.value.bName, 
          this.form.value.phoneNumber,
          this.form.value.emailAddress,
          this.form.value.businessType,
          this.form.value.jobAddress,
          this.form.value.imageUrl
        )
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/discover']);
          this.presentToast();
      });
    })
  

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

ngOnDestroy() {
  if (this.jobSub) {
    this.jobSub.unsubscribe();
  }
}

}
