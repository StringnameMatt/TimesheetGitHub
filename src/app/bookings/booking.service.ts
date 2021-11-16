import { Injectable } from "@angular/core";
import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, tap, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})

export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  constructor(private authService: AuthService) {}


addFavorite( placeId: string, 
             placeTitle: string, 
             placeImage: string, 
             firstName: string, 
             lastName: string,  
          ) {
            const newBooking = new Booking(
              Math.random().toString(), 
              placeId, 
              this.authService.userId, 
              placeTitle, 
              placeImage, 
              firstName, 
              lastName, 
          );
          return this.bookings.pipe(
            take(1),
            delay(1000), 
            tap(bookings => {
              this._bookings.next(bookings.concat(newBooking));
              
          })
        );

}

removeFavorite(bookingId: string) {

}




}