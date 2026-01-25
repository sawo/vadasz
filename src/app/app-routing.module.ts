import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './allathatarozo/details/details.component';
import { FegyvertanDetailsComponent } from './fegyvertan/fegyvertan-details/fegyvertan-details.component';
import { VadaszkutyakDetailsComponent } from './vadaszkutyak/vadaszkutyak-details/vadaszkutyak-details.component';
import { GyereksarokComponent } from './gyereksarok/gyereksarok.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'allathatarozo',
    pathMatch: 'full',
    loadChildren: () => import('./allathatarozo/allathatarozo.module').then(m => m.AllathatarozoPageModule)
  },
  {
    path: 'allathatarozo/:name',
    component: DetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'fegyvertan/:name',
    component: FegyvertanDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'vadaszkutyak/:name',
    component: VadaszkutyakDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'online-teszt',
    loadChildren: () => import('./online-teszt/online-teszt.module').then(m => m.OnlineTesztPageModule)
  },
  {
    path: 'vadaszkutyak',
    loadChildren: () => import('./vadaszkutyak/vadaszkutyak.module').then(m => m.VadaszkutyakPageModule)
  },
  {
    path: 'vadbetegsegek',
    loadChildren: () => import('./vadbetegsegek/vadbetegsegek.module').then(m => m.VadbetegsegekPageModule)
  },
  {
    path: 'vadaszati-modok',
    loadChildren: () => import('./vadaszati-modok/vadaszati-modok.module').then(m => m.VadaszatiModokPageModule)
  },
  {
    path: 'fegyvertan',
    loadChildren: () => import('./fegyvertan/fegyvertan.module').then(m => m.FegyvertanPageModule)
  },
  {
    path: 'gyereksarok',
    component: GyereksarokComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
