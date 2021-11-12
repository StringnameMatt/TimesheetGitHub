import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlacesPage } from './places.page';
import { TimesheetPageModule } from './timesheet/timesheet.module';
import { AuthGuard } from '../auth/auth.guard';
import { LeaverequestViewPageModule } from './leaverequest/leaverequest-view/leaverequest-view.module';
import { EditJobPageModule } from './discover/edit-job/edit-job.module';


const routes: Routes = [
  {
    path: 'tabs',
    component: PlacesPage,
    children: [
      {
        path: 'timesheet',
        children: [
          {
            path: '',
            loadChildren: () => import('./timesheet/timesheet.module').then(m => m.TimesheetPageModule)
          },
          {
            path: ':placeId',
            loadChildren: () => import('./discover/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          }
        ]
      },
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('./discover/discover.module').then(m => m.DiscoverPageModule)
          },
          {
            path: 'new',
            loadChildren: () => import('./discover/new-job-site/new-job-site.module').then(m => m.NewJobSitePageModule)
          },
          
          {
            path: 'edit/:placeId',
            loadChildren: () => import('./discover/edit-job/edit-job.module').then(m => m.EditJobPageModule)
          },
          {
            path: ':placeId',
            loadChildren: () => import('./discover/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          },
        ]
      },
      {
        path: 'leaverequest',
        children: [
          {
            path: '',
            loadChildren: () => import('./leaverequest/leaverequest.module').then(m => m.LeaverequestPageModule)
          },
          {
            path: 'new',
            loadChildren: () => import('./leaverequest/new-request/new-request.module').then(m => m.NewRequestPageModule)
          },
          {
            path: ':placeId',
            loadChildren: () => import('./leaverequest/leaverequest-view/leaverequest-view.module').then(m => m.LeaverequestViewPageModule)
          },
          
        ]
      },
      {
        path: 'offers',
        children: [
          {
            path: '',
            loadChildren: () => import('./offers/offers.module').then(m => m.OffersPageModule)
          },
          {
            path: 'new',
            loadChildren: () => import('./offers/new-offer/new-offer.module').then(m => m.NewOfferPageModule)
          },
          {
            path: 'edit/:placeId',
            loadChildren: () => import('./offers/edit-offer/edit-offer.module').then(m => m.EditOfferPageModule)
          },
          {
            path: ':placeId',
            loadChildren: () => import('./offers/offer-bookings/offer-bookings.module').then(m => m.OfferBookingsPageModule)
          },

          /* {
            path: ':jobId',
            loadChildren: () => import('./offers/offer-bookings/offer-bookings.module').then(m => m.OfferBookingsPageModule)
          } */
        ]
      },
      {
        path: '',
        redirectTo: '/places/tabs/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/places/tabs/timesheet',
    pathMatch: 'full'
  },
  {
    path: 'timesheet',
    loadChildren: () => import('./timesheet/timesheet.module').then( m => m.TimesheetPageModule)
  },
  {
    path: 'new-job-site',
    loadChildren: () => import('./discover/new-job-site/new-job-site.module').then( m => m.NewJobSitePageModule)
  },
  {
    path: 'leaverequest',
    loadChildren: () => import('./leaverequest/leaverequest.module').then( m => m.LeaverequestPageModule)
  },
  {
    path: 'edit-job',
    loadChildren: () => import('./discover/edit-job/edit-job.module').then( m => m.EditJobPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule {}
