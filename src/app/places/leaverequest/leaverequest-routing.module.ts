import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaverequestPage } from './leaverequest.page';

const routes: Routes = [
  {
    path: '',
    component: LeaverequestPage
  },
  {
    path: 'new-request',
    loadChildren: () => import('./new-request/new-request.module').then( m => m.NewRequestPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaverequestPageRoutingModule {}
