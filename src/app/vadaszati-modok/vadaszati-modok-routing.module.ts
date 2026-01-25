import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VadaszatiModokPageComponent } from './vadaszati-modok-page.component';

const routes: Routes = [
  {
    path: '',
    component: VadaszatiModokPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VadaszatiModokPageRoutingModule {}
