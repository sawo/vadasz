import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VadaszkutyakPageRoutingModule } from './vadaszkutyak-routing.module';

import { VadaszkutyakPage } from './vadaszkutyak.page';
import { VadaszkutyakFilterComponent } from './vadaszkutyak-filter/vadaszkutyak-filter.component';
import { VadaszkutyakDetailsComponent } from './vadaszkutyak-details/vadaszkutyak-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VadaszkutyakPageRoutingModule,
    VadaszkutyakPage,
    VadaszkutyakFilterComponent,
    VadaszkutyakDetailsComponent
  ],
})
export class VadaszkutyakPageModule {}
