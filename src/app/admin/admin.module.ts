import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { ListComponent } from './list/list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ComponentsModule } from "../components/components.module";
import { ResponsesComponent } from './responses/responses.component';
import { ResBySurveyComponent } from './res-by-survey/res-by-survey.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdminPageRoutingModule,
    ComponentsModule
],
  declarations: [AdminPage, ListComponent, AddUserComponent, ResponsesComponent, ResBySurveyComponent]
})
export class AdminPageModule {}
