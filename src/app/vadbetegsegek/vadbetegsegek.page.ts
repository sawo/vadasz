import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vadbetegsegek',
  templateUrl: './vadbetegsegek.page.html',
  styleUrls: ['./vadbetegsegek.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class VadbetegsegekPage implements OnInit {

  constructor() { }

  detailsPage = '';

  ngOnInit() {
  }

}
