import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewJobSitePageRoutingModule } from './new-job-site-routing.module';

import { NewJobSitePage } from './new-job-site.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewJobSitePageRoutingModule
  ],
  declarations: [NewJobSitePage]
})
export class NewJobSitePageModule {}
