import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VadbetegsegekPageRoutingModule } from './vadbetegsegek-routing.module';

import { VadbetegsegekPage } from './vadbetegsegek.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VadbetegsegekPageRoutingModule
  ],
  declarations: [VadbetegsegekPage]
})
export class VadbetegsegekPageModule {}
