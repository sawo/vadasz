import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllathatarozoPageRoutingModule } from './allathatarozo-routing.module';

import { AllathatarozoPage } from './allathatarozo.page';
import {FilterComponent} from "./filter/filter.component";
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllathatarozoPageRoutingModule,
    AllathatarozoPage,
    FilterComponent,
    DetailsComponent
  ],
})
export class AllathatarozoPageModule {}
