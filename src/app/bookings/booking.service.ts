import { Injectable } from "@angular/core";
import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface FavoriteData {
  name: string;
  image: string;
  pId: string;
  userId: string;

}


@Injectable({ providedIn: 'root'})

export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}


addFavorite( pId: string, 
             name: string, 
             pImage: string, 
              
          ) {
            let generatedId: string;
            const newBooking = new Booking(
              Math.random().toString(),
              this.authService.userId, 
              pId,
              name, 
              pImage, 
               
               
          );
          return this.http
          .post<{name: string}>(
            'https://timestruct-20or17-default-rtdb.firebaseio.com/favorites.json', 
            {...newBooking, id: null}
            )
            .pipe(
              switchMap(resData => {
              generatedId = resData.name;
              return this.bookings;
            }),
            take(1),
            tap(bookings => {
              newBooking.id = generatedId;
              this._bookings.next(bookings.concat(newBooking));
            })
          );
}

removeFavorite(bookingId: string) {

}

fetchFavorites() {
  return this.http
  .get<{ [key: string]: FavoriteData }>(
    `https://timestruct-20or17-default-rtdb.firebaseio.com/favorites.json?orderBy="userId"&equalTo="${
    this.authService.userId
  }"`
  )
  .pipe(map(favoriteData => {
    const favorites = [];
    for (const key in favoriteData) {
      if (favoriteData.hasOwnProperty(key)) {
        favorites.push(new Booking(
          key, 
          favoriteData[key].pId, 
          favoriteData[key].userId, 
          favoriteData[key].name,
          favoriteData[key].image
          )
        );
      }
    }
    return favorites;
  }), tap(favorites => {
    this._bookings.next(favorites)
  })
);
}




}