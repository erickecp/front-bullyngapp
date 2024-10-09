import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { VerEncuestaComponent } from './ver-encuesta/ver-encuesta.component';
import { PresentarEncuestaComponent } from './presentar-encuesta/presentar-encuesta.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { PrimervideoComponent } from './primervideo/primervideo.component';

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
    path: 'instructions/:id',
    component: InstructionsComponent
  },
  {
    path: 'firstvideo/:id',
    component: PrimervideoComponent
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
