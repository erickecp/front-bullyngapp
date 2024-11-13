import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ResponsesComponent } from './responses/responses.component';
import { ResBySurveyComponent } from './res-by-survey/res-by-survey.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddUserComponent
  },
  {
    path: 'responses',
    component: ResponsesComponent
  },
  {
    path: 'response/:id',
    component: ResBySurveyComponent
  },
  {
    path: 'add/:id',
    component: AddUserComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
