import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, delay, tap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Jobs } from './jobs.model';
import { HttpClient } from '@angular/common/http';
import { PlaceLocation } from '../location.model';
import { LocationPickerComponent } from '../../shared/pickers/location-picker/location-picker.component';
import { Place } from '../place.model';

interface JobData {
  businessName: string;
  phoneNumber: number;
  emailAddress: string;
  businessType: string;
  jobAddress: string;
  imageUrl: string;
  placeId: string;
  location: PlaceLocation;
}

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private _jobs = new BehaviorSubject<Jobs[]>([]);
    

  get jobs() {
    return this._jobs.asObservable();
  }

  

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchJobs() {
    return this.http
    .get<{[key: string]: JobData}>(
      'https://timestruct-20or17-default-rtdb.firebaseio.com/job-list.json'
    )
    .pipe(map(resData => {
      const jobs = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          jobs.push(
            new Jobs(
              key,
              resData[key].businessName,
              resData[key].phoneNumber,
              resData[key].emailAddress,
              resData[key].businessType,
              resData[key].jobAddress,
              resData[key].imageUrl,
              resData[key].placeId,
              resData[key].location,
              

            )
          );
        }
      }
      return jobs;
    }),
    tap(jobs => {
      this._jobs.next(jobs);
    })
  );
}

getJob(id: string) {
  return this.http
  .get<JobData>(
    `https://timestruct-20or17-default-rtdb.firebaseio.com/job-list/${id}.json`
    )
    .pipe(
      map(jobData => {
        return new Jobs(
          id, 
          jobData.businessName,  
          jobData.phoneNumber, 
          jobData.emailAddress, 
          jobData.businessType,
          jobData.jobAddress, 
          jobData.imageUrl, 
          jobData.placeId, 
          jobData.location
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

  /* getJob(id: string) {
    return this.jobs.pipe(
      take(1), 
      map(jobs => {
        return {...jobs.find(j => j.id === id)};
    })
    );
    
  } */

  updateJob(
    jobId: string,
    businessName: string,
    phoneNumber: number,
    emailAddress: string, 
    businessType: string,
    jobAddress: string, 
    location: PlaceLocation,
    ) {
      let updatedJobs: Jobs[];
    return this.jobs.pipe(
        take(1),
        switchMap( jobs => {
          if (!jobs || jobs.length <= 0) {
            return this.fetchJobs();
          } else {
            return of(jobs);
          }
        }),
        switchMap(jobs => {
          const updatedJobIndex = jobs.findIndex(jb => jb.id === jobId);
          updatedJobs = [...jobs];
          const oldJob = updatedJobs[updatedJobIndex];
          updatedJobs[updatedJobIndex] = new Jobs(
          oldJob.id, 
          businessName,  
          phoneNumber,
          emailAddress,
          businessType,
          jobAddress, 
          oldJob.imageUrl,
          oldJob.placeId,
          oldJob.location
          );
          return this.http.put(
            `https://timestruct-20or17-default-rtdb.firebaseio.com/job-list/${jobId}.json`,
            { ...updatedJobs[updatedJobIndex], id: null }
          );
        }),
        tap(() => {
          this._jobs.next(updatedJobs);                                          
        })
      );
  }



  addJob(
    businessName: string, 
    phoneNumber: number, 
    emailAddress: string, 
    businessType: string,
    jobAddress: string,
    location: PlaceLocation,
    ) {
      let generatedId: string;
      const newJob = new Jobs(
        Math.random().toString(), 
        businessName,  
        phoneNumber,
        emailAddress,
        businessType, 
        jobAddress,
        "https://cdn-icons-png.flaticon.com/512/3028/3028580.png",
        this.authService.placeId,
        location
        
      ); 

      return this.http
      
      .post<{name: string }>('https://timestruct-20or17-default-rtdb.firebaseio.com/job-list.json', {
        ...newJob,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.jobs;
          
        }),
        take(1),
        tap(jobs => {
          newJob.id = generatedId;
          this._jobs.next(jobs.concat(newJob));
          
        })
      );
      
  }

  deleteJob(jobId: string) {
    return this.http
    .delete(
      `https://timestruct-20or17-default-rtdb.firebaseio.com/job-list/${jobId}.json`
      ).pipe(
        switchMap(() => {
          return this.jobs;
        }),
        take(1),
        tap(jobs => {
          this._jobs.next(jobs.filter(j => j.id !== jobId));
        })
      );
  }

}