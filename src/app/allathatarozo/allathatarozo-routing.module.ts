import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllathatarozoPage } from './allathatarozo.page';

const routes: Routes = [
  {
    path: '',
    component: AllathatarozoPage
  }
];

@NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
          })
export class AllathatarozoPageRoutingModule {}
