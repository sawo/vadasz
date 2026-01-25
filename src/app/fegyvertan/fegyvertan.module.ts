import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FegyvertanPageRoutingModule } from './fegyvertan-routing.module';

import { FegyvertanPage } from './fegyvertan.page';
import { FegyvertanDetailsComponent } from './fegyvertan-details/fegyvertan-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FegyvertanPageRoutingModule
  ],
  declarations: [FegyvertanPage, FegyvertanDetailsComponent]
})
export class FegyvertanPageModule {}
