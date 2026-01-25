import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vadaszati-modok',
  templateUrl: './vadaszati-modok-page.component.html',
  styleUrls: ['./vadaszati-modok-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class VadaszatiModokPageComponent implements OnInit {

  constructor() { }

  detailsPage = '';

  ngOnInit() {
  }

}
