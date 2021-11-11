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
    'Vacation',
    'Matt Smith',
    'Going on vacation',
    new Date('2021-11-10'),
    new Date('2021-11-20')

  ),
  new Request(
    'r2',
    'Vacation',
    'Matt Smith',
    'Going on vacation',
    new Date('2021-11-10'),
    new Date('2021-11-20')

  ),
  
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