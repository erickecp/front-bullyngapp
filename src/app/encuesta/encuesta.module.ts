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

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,

    IonicModule,
    EncuestaPageRoutingModule
  ],
  declarations: [EncuestaPage, ListComponent,VerEncuestaComponent, DomSanitizePipe, PresentarEncuestaComponent]
})
export class EncuestaPageModule {}
