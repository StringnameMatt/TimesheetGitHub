import { Injectable } from '@angular/core';

import { Request } from './request.model';

import { take, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface RequestData {
  name: string;
  userId: string;
  type: string;
  reason: string;
  approval: string;
  dateFrom: Date;
  dateTo: Date;
  requestId: string;
}


@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private _requests = new BehaviorSubject<Request[]>([]);

  

  get requests() {
    return this._requests.asObservable();
  } 




  constructor(private authService: AuthService, private http: HttpClient) {}


  fetchRequests() {
    return this.http.get<{[key: string]: RequestData}>(
      `https://timestruct-20or17-default-rtdb.firebaseio.com/request-list.json?orderBy="userId"&equalTo="${
      this.authService.userId
      }"`
    )
    .pipe(map(resData => {
      const requests = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          requests.push(
            new Request(
              key,
              resData[key].userId,
              resData[key].name,
              resData[key].type,
              resData[key].reason,
              resData[key].approval,
              new Date(resData[key].dateFrom),
              new Date(resData[key].dateTo),
          )
        );
      }  
    }
    return requests;
    return [];
  }),
  tap(requests => {
    this._requests.next(requests);
  })
    
    )
  }

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
    approval: string, 
    dateFrom: Date, 
    dateTo: Date, 
    ) {
      let generatedId: string;
      const newRequest = new Request(
        Math.random().toString(),
        this.authService.userId, 
        name,
        type,
        reason,
        approval,
        dateFrom,
        dateTo,
      );
      return this.http
      .post<{name: string }>('https://timestruct-20or17-default-rtdb.firebaseio.com/request-list.json', {
      ...newRequest,
      id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.requests;
        }),
        take(1),
        tap(requests => {
          newRequest.id = generatedId;
          this._requests.next(requests.concat(newRequest));
        })
      )
      /* this.requests.pipe(take(1)).subscribe(requests => {
        this._requests.next(requests.concat(newRequest));
      }); */
      
  }

  cancelRequest(requestId: string) {
    return this.http
      .delete(
        `https://timestruct-20or17-default-rtdb.firebaseio.com/request-list/${requestId}.json`
      )
      .pipe(
        switchMap(() => {
          return this.requests;
        }),
        take(1),
        tap(requests => {
          this._requests.next(requests.filter(r => r.id !== requestId));
        })
      );
  }


}