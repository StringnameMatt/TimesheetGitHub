import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
        image: new FormControl(null)
        
    });
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


  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
    this.loadingCtrl.create( {
      message: 'Creating employee...'
    }).then(loadingEl => {
      loadingEl.present();
      this.placesService.uploadImage(this.form.get('image').value).pipe(switchMap(uploadRes => {
        return this.placesService
        .addEmployee(
          this.form.value.fName,
          this.form.value.lName,
          +this.form.value.phoneNumber,
          this.form.value.emailAddress,
          this.form.value.jobTitle,
          this.form.value.payGroup,
          uploadRes.imageUrl,
        );
      }))
     
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
