import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaverequestPageRoutingModule } from './leaverequest-routing.module';

import { LeaverequestPage } from './leaverequest.page';
import { CreateBookingComponent } from '../../bookings/create-booking/create-booking.component';
import { Routes, RouterModule } from '@angular/router';
import { LeaverequestItemComponent } from './leaverequest-item/leaverequest-item.component';

const routes: Routes = [
  {
    path: '',
    component: LeaverequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeaverequestPage, CreateBookingComponent, LeaverequestItemComponent],
  entryComponents: [CreateBookingComponent]
})
export class LeaverequestPageModule {}
