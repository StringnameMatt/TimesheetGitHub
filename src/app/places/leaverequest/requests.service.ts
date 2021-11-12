import { Injectable } from '@angular/core';

import { Request } from './request.model';

import { take, map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private _requests = new BehaviorSubject<Request[]>([
    new Request(
      'r1',
      'Matt',
      'Vacation',
      'Going to Italy',
      new Date('11-15-21'),
      new Date('11-20-21')
    )
  
]);

  

  get requests() {
    return this._requests.asObservable();
  } 




  constructor(private authService: AuthService) {}


  getRequest(id: string) {
    return this.requests.pipe(
      take(1),
      map(requests => {
        return {...requests.find(r => r.id === id)}
      })
    )
  }

  /* getRequest(id: string) {
    return {...this._requests.find(r => r.id === id)};
  } */

  addRequest(
    name: string, 
    type: string, 
    reason: string, 
    dateFrom: Date, 
    dateTo: Date, 
    ) {
      const newRequest = new Request(
        Math.random().toString(), 
        name,
        type,
        reason,
        dateFrom,
        dateTo,




        
      );
      this.requests.pipe(take(1)).subscribe(requests => {
        this._requests.next(requests.concat(newRequest));
      });
      
  }


}