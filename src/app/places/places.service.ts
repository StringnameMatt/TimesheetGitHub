import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, delay, tap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';

interface EmployeeData {
  firstName: string,
  lastName: string,
  phoneNumber: number,
  emailAddress: string,
  description: string,
  imageUrl: string,
  payGroup: string,
  userId: string,
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _employees = new BehaviorSubject<Place[]>([]);
    

  get places() {
    return this._employees.asObservable();
  }

  

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPlaces() {
    return this.http
    .get<{[key: string]: EmployeeData}>(
      'https://timestruct-20or17-default-rtdb.firebaseio.com/employee-list.json'
    )
    .pipe(map(resData => {
      const employees = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          employees.push(
            new Place(
              key,
              resData[key].firstName,
              resData[key].lastName,
              resData[key].phoneNumber,
              resData[key].emailAddress,
              resData[key].description,
              resData[key].payGroup,
              resData[key].imageUrl,
              resData[key].userId,

            )
          );
        }
      }
      return employees;
    }),
    tap(employees => {
      this._employees.next(employees);
    })
  );
}

  getPlace(id: string) {
    return this.places.pipe(
      take(1), 
      map(places => {
        return {...places.find(p => p.id === id)};
    })
    );
    
  }

  updateEmployee(
      employeeId: string, 
      firstName: string, 
      lastName: string,
      phoneNumber: number,
      emailAddress: string,
      description: string,
      payGroup: string,
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
  this._employees.next(updatedEmployees);                                          
  }))
  }


  addEmployee(
    firstName: string,
    lastName: string, 
    phoneNumber: number, 
    emailAddress: string, 
    jobTitle: string,
    payGroup: string,
    ) {
      let generatedId: string;
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

      return this.http
      
      .post<{name: string }>('https://timestruct-20or17-default-rtdb.firebaseio.com/employee-list.json', {
        ...newEmployee,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places;
          
        }),
        take(1),
        tap(employees => {
          newEmployee.id = generatedId;
          this._employees.next(employees.concat(newEmployee));
          
        })
      );
      
  }

}