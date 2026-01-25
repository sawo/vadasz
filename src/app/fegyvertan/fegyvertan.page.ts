import { Component, OnInit } from '@angular/core';
import { FetchLocalDataService } from '../services/fetch-local-data.service';

@Component({
             selector: 'app-fegyvertan',
             templateUrl: './fegyvertan.page.html',
             styleUrls: ['./fegyvertan.page.scss']
           })
export class FegyvertanPage implements OnInit {

  public fegyvertanCategories;
  public dataLoaded: Promise<boolean>;
  public isOdd: boolean;

  constructor(public fetchLocalDataService: FetchLocalDataService) {
  }

  ngOnInit() {
    this.fetchLocalData().then(r => this.dataLoaded = Promise.resolve(true));
  }

  async fetchLocalData() {
    await this.fetchLocalDataService.loadLocalRegister('fegyvertan');
    this.fegyvertanCategories = this.fetchLocalDataService.localDataToLoad;
    this.isOdd = this.fetchLocalDataService.isOdd;
  }

}
