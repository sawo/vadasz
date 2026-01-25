import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VadaszatiModokPageRoutingModule } from './vadaszati-modok-routing.module';

import { VadaszatiModokPage } from './vadaszati-modok-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VadaszatiModokPageRoutingModule
  ],
  declarations: [VadaszatiModokPage]
})
export class VadaszatiModokPageModule {}
