import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineTesztPageRoutingModule } from './online-teszt-routing.module';

import { OnlineTesztPage } from './online-teszt.page';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
            imports: [
              CommonModule,
              FormsModule,
              IonicModule,
              OnlineTesztPageRoutingModule,
              ChartModule
            ],
  declarations: [OnlineTesztPage]
})
export class OnlineTesztPageModule {}
