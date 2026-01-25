import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-gyereksarok',
  templateUrl: './gyereksarok.component.html',
  styleUrls: ['./gyereksarok.component.scss'],
  imports: [
    IonicModule,
  ]
})
export class GyereksarokComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
