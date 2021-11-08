import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewJobSitePage } from './new-job-site.page';

const routes: Routes = [
  {
    path: '',
    component: NewJobSitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewJobSitePageRoutingModule {}
