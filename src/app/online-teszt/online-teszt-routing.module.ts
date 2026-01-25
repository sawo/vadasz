import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineTesztPage } from './online-teszt.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineTesztPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineTesztPageRoutingModule {}
