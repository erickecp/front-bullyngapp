import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolPageRoutingModule } from './school-routing.module';

import { SchoolPage } from './school.page';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SchoolPageRoutingModule,
    ComponentsModule
],
  declarations: [SchoolPage, ListComponent, AddComponent]
})
export class SchoolPageModule {}
