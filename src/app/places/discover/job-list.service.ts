import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Jobs } from './jobs.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private _jobs = new BehaviorSubject<Jobs[]>([
    new Jobs(
    'j1',
    'Mcdonalds',
    '5035554488',
    'mcdonalds@gmail.com',
    'Restaurant',
    '5433 23rd ave Salem, OR',
    'https://cdn-icons.flaticon.com/png/512/1376/premium/1376387.png?token=exp=1636235602~hmac=010397737a44c518e6c43727445d0652',
    

  ),
  new Jobs(
    'j2',
    'Anchorage Airport',
    '9076648874',
    'aairport@gmail.com',
    'Airport',
    '644 Airport Way Anchorage, AK',
    'https://cdn-icons-png.flaticon.com/512/2084/2084175.png',
      
    
  ),
  new Jobs(
    'j3',
    'General High School',
    '5035558874',
    'ghighschool@gmail.com',
    'School',
    '544 43rd Ave Salem, OR',
    'https://cdn-icons-png.flaticon.com/512/1080/1080985.png',
    

  ),
  new Jobs(
    'j4',
    'General Hospital',
    '5035556776',
    'ghospital@gmail.com',
    'Hospital',
    '1326 15th St Salem, OR',
    'https://cdn-icons.flaticon.com/png/512/2785/premium/2785547.png?token=exp=1636235465~hmac=e4f098f292310cd1cc5d572a6385be5d',
    
    
  ),
  new Jobs(
    'j5',
    'Safeway',
    '5032335677',
    'safeway@gmail.com',
    'Grocery Store',
    '1233 189th St Salem, OR',
    'https://cdn-icons-png.flaticon.com/512/3082/3082031.png',
    
    
  ),
  new Jobs(
    'j6',
    'Walmart',
    '5032223334',
    'walmart@gmail.com',
    'Grocery Store',
    '1099 43rd Ave Portland, OR',
    'https://cdn-icons-png.flaticon.com/512/3082/3082031.png',
    
  ),
  new Jobs(
    'j7',
    'Best Buy',
    '9074481125',
    'bestbuy@gmail.com',
    'Electronics',
    '1033 83rd Ave Portland, OR',
    'https://cdn-icons-png.flaticon.com/512/3028/3028580.png',
    
  )
]);
    

  get jobs() {
    return this._jobs.asObservable();
  }

  

  constructor(private authService: AuthService) {}

  getJob(id: string) {
    return this.jobs.pipe(
      take(1), 
      map(jobs => {
        return {...jobs.find(j => j.id === id)};
    })
    );
    
  }


  addJob(
    businessName: string, 
    phoneNumber: string, 
    emailAddress: string, 
    businessType: string,
    jobAddress: string,
    ) {
      const newJob = new Jobs(
        Math.random().toString(), 
        businessName,  
        phoneNumber, 
        emailAddress,
        businessType, 
        jobAddress,
        "https://cdn-icons-png.flaticon.com/512/3028/3028580.png", 
      );
      this.jobs.pipe(take(1)).subscribe(jobs => {
        this._jobs.next(jobs.concat(newJob));
      });
      
  }

}