import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaverequestViewPage } from './leaverequest-view.page';

const routes: Routes = [
  {
    path: '',
    component: LeaverequestViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaverequestViewPageRoutingModule {}
