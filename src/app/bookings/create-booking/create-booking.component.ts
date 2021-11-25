import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingService } from '../booking.service';
import { Place } from '../../places/place.model';
import { Subscription } from 'rxjs';
import { Booking } from '../booking.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  loadedBookings: Booking[];
  private bookingSub: Subscription;


  constructor(private modalCtrl: ModalController, private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
      // this.listedLoadedRequests = this.relevantRequests.slice(0);
   });
    /* this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    }); */
}
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    this.modalCtrl.dismiss({ message: 'This is a dummy message!' }, 'confirm');
    
  }
}
