import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
    {
      path: 'admin',
      canActivate: [authGuard],
      loadChildren: () => import('../admin/admin.module').then(m=>m.AdminPageModule)
    },
    {
      path: 'school',
      loadChildren: () => import('../school/school.module').then(m=>m.SchoolPageModule)
    },
    {
      path: 'encuesta',
      canActivate: [authGuard],
      loadChildren: () => import('../encuesta/encuesta.module').then(m=>m.EncuestaPageModule)
    }



    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
