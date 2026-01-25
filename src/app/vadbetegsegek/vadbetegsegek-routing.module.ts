import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VadbetegsegekPage } from './vadbetegsegek.page';

const routes: Routes = [
  {
    path: '',
    component: VadbetegsegekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VadbetegsegekPageRoutingModule {}
