import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class AppComponent {
  public navigate =
      [
        {
          title : 'Kezdőlap',
          url   : '/',
          icon  : 'apps-outline'
        },
        {
          title : 'Állathatározó',
          url   : '/allathatarozo',
          icon  : 'logo-gitlab'
        },
        {
          title : 'Online teszt',
          url   : '/online-teszt',
          icon  : 'desktop-outline'
        },
        {
          title : 'Fegyvertan',
          url   : '/fegyvertan',
          icon  : 'telescope-outline'
        },
        {
          title : 'Vadászkutyák',
          url   : '/vadaszkutyak',
          icon  : 'paw-outline'
        },
        {
          title : 'Vadbetegségek',
          url   : '/vadbetegsegek',
          icon  : 'skull-outline'
        },
        {
          title : 'Vadászati módok',
          url   : '/vadaszati-modok',
          icon  : 'locate-outline'
        },
        {
          title : 'Gyereksarok',
          url   : '/gyereksarok',
          icon  : 'paper-plane'
        }
      ];
  constructor() {}
}
