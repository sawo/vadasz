import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VadaszkutyakPage } from './vadaszkutyak.page';

const routes: Routes = [
  {
    path: '',
    component: VadaszkutyakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VadaszkutyakPageRoutingModule {}
