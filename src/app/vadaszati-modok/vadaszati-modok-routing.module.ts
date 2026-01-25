import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VadaszatiModokPage } from './vadaszati-modok-page.component';

const routes: Routes = [
  {
    path: '',
    component: VadaszatiModokPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VadaszatiModokPageRoutingModule {}
