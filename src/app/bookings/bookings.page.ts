import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;
  isFavorite = false;
  isLoading = false;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
      // this.listedLoadedRequests = this.relevantRequests.slice(0);
   });
    /* this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    }); */
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingService.fetchFavorites().subscribe(() => {
      this.isLoading = false;
    })
  }

  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    
    // cancel booking with id offerId
  }

  ngOnDestroy() {
    if(this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
      
  }

}
