import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditJobPageRoutingModule } from './edit-job-routing.module';

import { EditJobPage } from './edit-job.page';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EditJobPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditJobPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditJobPage]
})
export class EditJobPageModule {}
