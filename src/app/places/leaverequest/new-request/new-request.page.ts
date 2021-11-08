import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.page.html',
  styleUrls: ['./new-request.page.scss'],
})
export class NewRequestPage implements OnInit {
  @ViewChild('f', { static: true }) forms: NgForm;
  form: FormGroup;
  place: Place[];
  loadedPlace: Place[];

  constructor(
    private placesService: PlacesService,
  ) { }

  ngOnInit() {
    this.place = this.placesService.places;
    this.loadedPlace = this.place.slice(0);
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
      })
    });
  }

  onSubmitRequest() {
    if (!this.form.valid || !this.datesValid) {
      return;
    }
    console.log("Successfully sent!");
    console.log(this.form);

  }

  datesValid() {
    const startDate = new Date(this.form.value['dateFrom']);
    const endDate = new Date(this.form.value['dateTo']);
    return endDate > startDate;
  }


}
