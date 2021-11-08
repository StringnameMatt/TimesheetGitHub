import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaverequestViewPageRoutingModule } from './leaverequest-view-routing.module';

import { LeaverequestViewPage } from './leaverequest-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaverequestViewPageRoutingModule
  ],
  declarations: [LeaverequestViewPage]
})
export class LeaverequestViewPageModule {}
