import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, delay, tap } from 'rxjs/operators';
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
    'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
    

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
    'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',
    
    
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

    updateJob(jobId: string, 
      businessName: string, 
      phoneNumber: string,
      emailAddress: string,
      businessType: string,
      jobAddress: string,
      ) {
  return this.jobs.pipe(
  take(1),
  delay(1000), 
  tap(jobs => {
  const updatedJobIndex = jobs.findIndex(jb => jb.id === jobId);
  const updatedJobs = [...jobs];
  const oldJob = updatedJobs[updatedJobIndex];
  updatedJobs[updatedJobIndex] = new Jobs(
  oldJob.id, 
  businessName,  
  phoneNumber,
  emailAddress,
  businessType,
  jobAddress, 
  oldJob.imageUrl,
  );
  this._jobs.next(updatedJobs);                                          
  }))
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