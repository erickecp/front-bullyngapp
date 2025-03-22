import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { VerEncuestaComponent } from './ver-encuesta/ver-encuesta.component';
import { PresentarEncuestaComponent } from './presentar-encuesta/presentar-encuesta.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { PrimervideoComponent } from './primervideo/primervideo.component';
import { authGuard } from '../guards/auth.guard';
import { EncuestaFormComponent } from './encuesta-form/encuesta-form.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'ver/:id',
    canActivate: [authGuard],
    component: VerEncuestaComponent
  },
  {
    path: 'instructions/:id',
    canActivate: [authGuard],
    component: InstructionsComponent
  },
  {
    path: 'encuestaform/:id',
    canActivate: [authGuard],
    component: EncuestaFormComponent
  },
  {
    path: 'encuestafinal/:id/:f',
    canActivate: [authGuard],
    component: EncuestaFormComponent
  },
  {
    path: 'firstvideo/:id',
    canActivate: [authGuard],
    component: PrimervideoComponent
  },
  {
    path: 'ver/:id/presentar',
    canActivate: [authGuard],
    component: PresentarEncuestaComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuestaPageRoutingModule {}
