import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsService } from '../job-list.service';
import { Jobs } from '../jobs.model';
import { PlaceLocation } from '../../location.model';
import { AuthService } from '../../../auth/auth.service';

function base64toBlob(base64Data: any, contentType: any) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);
 
  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);
 
      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-new-job-site',
  templateUrl: './new-job-site.page.html',
  styleUrls: ['./new-job-site.page.scss'],
})
export class NewJobSitePage implements OnInit, OnDestroy {
  place: Place;
  job: Jobs;
  jobId: string;
  form: FormGroup;
  private jobSub: Subscription;
  isLoading = false;
  // private jobService: PlacesService;

  constructor(
    private jobsService: JobsService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    
    private router: Router) { }

  ngOnInit() {
    
        this.form = new FormGroup({
        bName: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        phoneNumber: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        emailAddress: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.email]
        }),
        businessType: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        jobAddress: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
          location: new FormControl(null, {
          updateOn: 'blur', 
        }),
        image: new FormControl(null)
    });
  }

  


  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({location: location });
  }

  

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create( {
      message: 'Creating Job Site...'
    }).then(loadingEl => {
      loadingEl.present();
      this.jobsService
      .addJob(
        this.form.value.bName,
        +this.form.value.phoneNumber,
        this.form.value.emailAddress,
        this.form.value.businessType,
        this.form.value.jobAddress,
        this.form.value.location
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/discover'])
        this.presentToast();
      })
    })

  }

  onImagePicked (imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64', ''), 
          'image/jpeg'
          );
      } catch (error) {
          console.log(error);
          return;
        }
      } else {
        imageFile = imageData;
    } 
    this.form.patchValue({image: imageFile });
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
