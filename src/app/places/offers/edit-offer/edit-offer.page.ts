import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
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
        payRate: new FormControl(this.place.payGroup, {
          updateOn: 'change',
          validators: [Validators.required]
        })
      });
    });

    
  }
  onUpdateEmployee() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);
  }
}
