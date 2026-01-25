import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchLocalDataService } from '../../services/fetch-local-data.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
             selector: 'app-fegyvertan-details',
             templateUrl: './fegyvertan-details.component.html',
             styleUrls: ['./fegyvertan-details.component.scss'],
             standalone: true,
             imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule
              ]
           })
export class FegyvertanDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  fetchLocalDataService = inject(FetchLocalDataService);

  private passedData: number;
  private options;
  public dataLoaded: Promise<boolean>;
  public currentOption;
  private currentLink: string;
  private filterByUrl: {};

  accordionOpen = [];

  ngOnInit() {
    this.passedData = history.state.data;
    this.fetchLocalData().then(r => this.dataLoaded = Promise.resolve(true));
  }

  async fetchLocalData() {
    await this.fetchLocalDataService.loadLocalRegister('fegyvertan');
    this.options = this.fetchLocalDataService.localDataToLoad;
    this.fillCurrentData();
  }

  fillCurrentData() {
    if (this.passedData) {
      this.currentOption = this.options[this.passedData];
      this.accordionBoolSetup(this.currentOption);
    } else {
      this.route.paramMap.subscribe(params => {
        this.currentLink = params.get("name");
      });
      this.filterByUrl = {linkName: this.currentLink};
      this.filterByUrlFunction(this.options, this.currentLink);
    }
  }

  filterByUrlFunction(obj, filter) {
    for (let i = 0; i < Object.keys(obj).length; i++) {
      if (obj[i].linkName === filter) {
        this.currentOption = obj[i];
      }
    }
  }

  accordionBoolSetup(currentOption) {
    if (currentOption.paragraphs) {
      this.accordionOpen = [];
      for (let i = 0; i < currentOption.paragraphs.length; i++) {
        this.accordionOpen.push(false);
      }
    }
  }
}
