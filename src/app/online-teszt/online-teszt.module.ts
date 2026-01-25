import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OnlineTesztPageRoutingModule } from './online-teszt-routing.module';
import { OnlineTesztPage } from './online-teszt.page';

@NgModule({
            imports: [
              CommonModule,
              FormsModule,
              IonicModule,
              OnlineTesztPageRoutingModule,
              OnlineTesztPage
            ],
})
export class OnlineTesztPageModule {}
