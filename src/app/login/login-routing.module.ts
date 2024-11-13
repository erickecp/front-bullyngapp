import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { ButtonColorPipe } from '../pipes/button-color.pipe';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [ButtonColorPipe ],
  exports: [RouterModule, ButtonColorPipe ],
})
export class LoginPageRoutingModule {}
