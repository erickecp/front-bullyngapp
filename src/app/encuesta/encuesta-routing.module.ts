import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { VerEncuestaComponent } from './ver-encuesta/ver-encuesta.component';
import { PresentarEncuestaComponent } from './presentar-encuesta/presentar-encuesta.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'ver/:id',
    component: VerEncuestaComponent
  },

  {
    path: 'ver/:id/presentar',
    component: PresentarEncuestaComponent
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuestaPageRoutingModule {}
