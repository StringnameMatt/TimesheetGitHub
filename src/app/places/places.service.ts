import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, delay, tap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface EmployeeData {
  firstName: string,
  lastName: string,
  phoneNumber: number,
  emailAddress: string,
  description: string,
  imageUrl: string,
  payGroup: string,
  userId: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _employees = new BehaviorSubject<Place[]>([]);
  isLoading = false;
    

  get places() {
    return this._employees.asObservable();
  }

  

  constructor(
    private authService: AuthService, 
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    ) {}

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
              resData[key].password,
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
    return this.http
    .get<EmployeeData>(
      `https://timestruct-20or17-default-rtdb.firebaseio.com/employee-list/${id}.json`
      )
      .pipe(
        map(employeeData => {
          return new Place(
            id, 
            employeeData.firstName, 
            employeeData.lastName, 
            employeeData.phoneNumber, 
            employeeData.emailAddress, 
            employeeData.description, 
            employeeData.payGroup, 
            employeeData.imageUrl, 
            employeeData.userId,
            employeeData.password,
            );
        })
    );
     
    
    /* return this.places.pipe(
      take(1), 
      map(places => {
        return {...places.find(p => p.id === id)};
    })
    ); */
     
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
        let updatedEmployees: Place[];
      return this.places.pipe(
          take(1),
          switchMap( employees => {
            if (!employees || employees.length <= 0) {
              return this.fetchPlaces()
            } else {
              return of(employees);
            }
          }),
          switchMap(employees => {
            const updatedEmployeeIndex = employees.findIndex(em => em.id === employeeId);
            updatedEmployees = [...employees];
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
            oldEmployee.userId,
            oldEmployee.password
            );
            return this.http.put(
              `https://timestruct-20or17-default-rtdb.firebaseio.com/employee-list/${employeeId}.json`,
              { ...updatedEmployees[updatedEmployeeIndex], id: null }
            );
          }),
          tap(() => {
            this._employees.next(updatedEmployees);                                          
          })
        );
    }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.http.post<{
      imageUrl: string, 
      imagePath: string}>('https://us-central1-timestruct-20or17.cloudfunctions.net/storeImage', 
      uploadData);
  }
  


  addEmployee(
    firstName: string,
    lastName: string, 
    phoneNumber: number, 
    emailAddress: string, 
    jobTitle: string,
    payGroup: string,
    imageUrl: string,
    password: string,
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
        imageUrl,
        password, 
        this.authService.userId
        
      ); 
      this.authService.signup(emailAddress, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          
          this.router.navigateByUrl('/places/tabs/offers');
        },
        errRes => {

            const code = errRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            let header = 'Duplicate!'
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already! If this was on accident, you might want to delete the duplicate email account.';
            }
            this.showAlert(message, header);
            return;
        }
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

  deleteEmployee(employeeId: string) {
    return this.http
    .delete(
      `https://timestruct-20or17-default-rtdb.firebaseio.com/employee-list/${employeeId}.json`
      ).pipe(
        switchMap(() => {
          return this.places;
        }),
        take(1),
        tap(bookings => {
          this._employees.next(bookings.filter(e => e.id !== employeeId));
        })
      );
  }

  private showAlert(message: string, header: string) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        buttons: ['Okay'],
        cssClass: 'alert'
      })
      .then(alertEl => alertEl.present());
  }

}