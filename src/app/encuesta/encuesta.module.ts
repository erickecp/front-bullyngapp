import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestaPageRoutingModule } from './encuesta-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EncuestaPage } from './encuesta.page';
import { ListComponent } from './list/list.component';
import { VerEncuestaComponent } from './ver-encuesta/ver-encuesta.component';
import { DomSanitizePipe } from '../pipes/safepipe.pipe';
import { PresentarEncuestaComponent } from './presentar-encuesta/presentar-encuesta.component';
import { CardEncuestaComponent } from '../components/card-encuesta/card-encuesta.component';
import { ComponentsModule } from '../components/components.module';
import { InstructionsComponent } from './instructions/instructions.component';
import { PrimervideoComponent } from './primervideo/primervideo.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule,
    EncuestaPageRoutingModule
  ],
  declarations: [EncuestaPage, ListComponent,VerEncuestaComponent,PrimervideoComponent, DomSanitizePipe, PresentarEncuestaComponent,InstructionsComponent, ]
})
export class EncuestaPageModule {}
