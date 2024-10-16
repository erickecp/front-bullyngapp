import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [{
      path: 'admin',
      loadChildren: () => import('../admin/admin.module').then(m=>m.AdminPageModule)
    },
    {
      path: 'encuesta',
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
