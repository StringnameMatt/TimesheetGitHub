import { Injectable } from '@angular/core';

import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
    'p1',
    'Matt',
    'Smith',
    '5036023274',
    'matt@gmail.com',
    'App Developer',
    'G',
    'https://cdn-icons-png.flaticon.com/512/265/265674.png',
    'userId'

  ),
  new Place(
    'p2',
    'James',
    'Skokan',
    '9075555555',
    'james@gmail.com',
    'Foreman',
    'D',
    'https://cdn-icons-png.flaticon.com/512/3048/3048189.png',
    'userId'
  ),
  new Place(
    'p3',
    'Cory',
    'Ness',
    '9074444444',
    'cory@gmail.com',
    'Foreman',
    'D',
    'https://freeiconshop.com/wp-content/uploads/edd/person-outline-filled.png',
    'userId'

  ),
  new Place(
    'p4',
    'Mike',
    'Dolato',
    '5031556666',
    'mike@gmail.com',
    'Plumber',
    'D',
    'https://cdn-icons-png.flaticon.com/512/921/921110.png',
    'userId'
  ),
  new Place(
    'p5',
    'Brandon',
    'Adams',
    '5032222554',
    'brandon@gmail.com',
    'Electrician',
    'E',
    'https://cdn-icons-png.flaticon.com/512/921/921077.png',
    'userId'
  ),
  new Place(
    'p6',
    'Paul',
    'Linnel',
    '9075554488',
    'paul@gmail.com',
    'Architecht',
    'T',
    'https://cdn-icons-png.flaticon.com/512/3048/3048122.png',
    'userId'
  ),
  new Place(
    'p7',
    'Joe',
    'Callison',
    '9078889999',
    'joe@gmail.com',
    'Architecht',
    'T',
    'https://cdn-icons-png.flaticon.com/512/1376/1376609.png',
    'userId'
  )
]);

  

  /* get requests() {
    return [...this._requests];
  } */


  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) {}


  getPlace(id: string) {
    return this.places.pipe(
      take(1), 
      map(places => {
        return {...places.find(p => p.id === id)};
    }));
    
  }

  /* getRequest(id: string) {
    return {...this._requests.find(r => r.id === id)};
  } */

  addEmployee(
    firstName: string, 
    lastName: string, 
    phoneNumber: string, 
    emailAddress: string, 
    jobTitle: string, 
    payGroup: string
    ) {
      const newEmployee = new Place(
        Math.random().toString(), 
        firstName, 
        lastName, 
        phoneNumber, 
        emailAddress, 
        jobTitle, 
        payGroup, 
        "https://cdn-icons-png.flaticon.com/512/265/265674.png", 
        this.authService.userId
      );
      return this.places.pipe(
        take(1), 
        delay(1000), 
        tap(places => {
          this._places.next(places.concat(newEmployee));
        })
    );
  }

  updateEmployee(employeeId: string, 
                 firstName: string, 
                 lastName: string,
                 phoneNumber: string,
                 emailAddress: string,
                 description: string,
                 payGroup: string
                 ) {
    return this.places.pipe(
      take(1),
      delay(1000), 
      tap(employees => {
      const updatedEmployeeIndex = employees.findIndex(em => em.id === employeeId);
      const updatedEmployees = [...employees];
      const oldEmployee = updatedEmployees[updatedEmployeeIndex];
      updatedEmployees[updatedEmployeeIndex] = new Place(
          oldEmployee.id, 
          firstName,  
          lastName,
          phoneNumber,
          emailAddress,
          description, 
          payGroup,
          oldEmployee.imageUrl,                                          
          oldEmployee.userId
          );
          this._places.next(updatedEmployees);                                          
    }))
  }


}