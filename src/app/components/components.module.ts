import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardEncuestaComponent } from './card-encuesta/card-encuesta.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    CardEncuestaComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardEncuestaComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
