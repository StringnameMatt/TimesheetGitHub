import { Injectable } from '@angular/core';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Matt',
      'Smith',
      '5036023274',
      'matt@gmail.com',
      'App Developer',
      'G',
      'https://cdn-icons-png.flaticon.com/512/265/265674.png'

    ),
    new Place(
      'p2',
      'James',
      'Skokan',
      '9075555555',
      'james@gmail.com',
      'Foreman',
      'D',
      'https://cdn-icons.flaticon.com/png/512/4441/premium/4441037.png?token=exp=1636234792~hmac=1ce55e99db97d11c894b105b68e2c7f4'
    ),
    new Place(
      'p3',
      'Cory',
      'Ness',
      '9074444444',
      'cory@gmail.com',
      'Foreman',
      '',
      'https://freeiconshop.com/wp-content/uploads/edd/person-outline-filled.png'

    ),
    new Place(
      'p4',
      'Mike',
      'Dolato',
      '5031556666',
      'mike@gmail.com',
      'Plumber',
      'D',
      'https://cdn-icons.flaticon.com/png/512/3006/premium/3006876.png?token=exp=1636234623~hmac=65ef066ecaaa0297c131ae919646a0ed'
    ),
    new Place(
      'p5',
      'Brandon',
      'Adams',
      '5032222554',
      'brandon@gmail.com',
      'Electrician',
      'E',
      'https://cdn-icons.flaticon.com/png/512/771/premium/771369.png?token=exp=1636234733~hmac=92f87f22906e583e9547a3622d46f1ee'
    ),
    new Place(
      'p6',
      'Paul',
      'Linnel',
      '9075554488',
      'paul@gmail.com',
      'Architecht',
      'T',
      'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'
    ),
    new Place(
      'p7',
      'Joe',
      'Callison',
      '9078889999',
      'joe@gmail.com',
      'Architecht',
      'T',
      'https://cdn-icons.flaticon.com/png/512/3146/premium/3146501.png?token=exp=1636250671~hmac=39c1003c99fe961ebb0cebf1203d6715'
    ),
  ];

  private _jobs: Place[] = [
    new Place(
      'j1',
      'McDonalds',
      '',
      '',
      '',
      'Restaurant',
      '',
      'https://cdn-icons.flaticon.com/png/512/1376/premium/1376387.png?token=exp=1636235602~hmac=010397737a44c518e6c43727445d0652'

    ),
    new Place(
      'j2',
      'Anchorage Airport',
      '',
      '',
      '',
      'Airport',
      '',
      'https://cdn-icons-png.flaticon.com/512/2084/2084175.png'
    ),
    new Place(
      'j3',
      'General High School',
      '',
      '',
      '',
      'School',
      '',
      'https://cdn-icons-png.flaticon.com/512/1080/1080985.png'

    ),
    new Place(
      'j4',
      'General Hospital',
      '',
      '',
      '',
      'Hospital',
      '',
      'https://cdn-icons.flaticon.com/png/512/2785/premium/2785547.png?token=exp=1636235465~hmac=e4f098f292310cd1cc5d572a6385be5d'
    ),
    new Place(
      'j5',
      'Safeway',
      '',
      '',
      '',
      'Grocery Store',
      '',
      'https://cdn-icons-png.flaticon.com/512/3082/3082031.png'
    ),
  ];

  private _requests: Place[] = [
    new Place(
      'r1',
      'Sick',
      '',
      '',
      '',
      'Approved',
      '',
      ''

    ),
    new Place(
      'r2',
      'Vacation',
      '',
      '',
      '',
      'Approved',
      '',
      ''
    ),
    new Place(
      'r3',
      'Vacation',
      '',
      '',
      '',
      'Pending Approval',
      '',
      ''
    ),
    
  ];

  get requests() {
    return [...this._requests];
  }

  get jobs() {
    return [...this._jobs];
  }

  get places() {
    return [...this._places];
  }

  constructor() {}

  getJob(id: string) {
    return {...this._jobs.find(j => j.id === id)};
  }

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }

  getRequest(id: string) {
    return {...this._requests.find(r => r.id === id)};
  }
}