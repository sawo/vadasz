import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FegyvertanPage } from './fegyvertan.page';

const routes: Routes = [
  {
    path: '',
    component: FegyvertanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FegyvertanPageRoutingModule {}
