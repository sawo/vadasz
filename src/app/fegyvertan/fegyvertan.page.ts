import { Component, OnInit, inject } from '@angular/core';
import { FetchLocalDataService } from '../services/fetch-local-data.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
             selector: 'app-fegyvertan',
             templateUrl: './fegyvertan.page.html',
             styleUrls: ['./fegyvertan.page.scss'],
             standalone: true,
             imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule
              ]
           })
export class FegyvertanPage implements OnInit {
  fetchLocalDataService = inject(FetchLocalDataService);


  public fegyvertanCategories;
  public dataLoaded: Promise<boolean>;
  public isOdd: boolean;

  ngOnInit() {
    this.fetchLocalData().then(r => this.dataLoaded = Promise.resolve(true));
  }

  async fetchLocalData() {
    await this.fetchLocalDataService.loadLocalRegister('fegyvertan');
    this.fegyvertanCategories = this.fetchLocalDataService.localDataToLoad;
    this.isOdd = this.fetchLocalDataService.isOdd;
  }

}
