import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FetchLocalDataService } from '../services/fetch-local-data.service';
import { VadaszkutyakFilterComponent } from './vadaszkutyak-filter/vadaszkutyak-filter.component';
import { VadaszkutyaModel } from './vadaszkutya.model';
import { FilteringService } from '../services/filtering.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
             selector: 'app-vadaszkutyak',
             templateUrl: './vadaszkutyak.page.html',
             styleUrls: ['./vadaszkutyak.page.scss'],
             standalone: true,
             imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule,
              ]
           })
export class VadaszkutyakPage implements OnInit {
  modalController = inject(ModalController);
  fetchLocalDataService = inject(FetchLocalDataService);
  filteringService = inject(FilteringService);


  public huntingDogs: VadaszkutyaModel[];
  private huntingDogsFiltered: VadaszkutyaModel[];
  public dataLoaded: Promise<boolean>;
  public isOdd: boolean;
  private isFilteringOn = false;

  constructor() {
    this.filteringService.isHuntingDogFilteringRequired.subscribe(value => {
      this.fetchHuntingDogsData().then(r => this.dataLoaded = Promise.resolve(true));
      this.isFilteringOn = this.filteringService.filters;
    })
  }

  ngOnInit() {
    this.fetchHuntingDogsData().then(r => this.dataLoaded = Promise.resolve(true));
  }

  async fetchHuntingDogsData(quickSearchFilter?) {
    await this.fetchLocalDataService.loadLocalRegister('vadaszkutyak');


    if (this.isFilteringOn) {
      this.huntingDogs = [];
      for (let i = 0; i < this.filteringService.sortedHuntingDogFilters.length; i++) {
        for (let x = 0; x < this.fetchLocalDataService.localDataToLoad.filter(item => item.type2 === this.filteringService.sortedHuntingDogFilters[i]).length; x++) {
          this.huntingDogs.push(this.fetchLocalDataService.localDataToLoad.filter(item => item.type2 === this.filteringService.sortedHuntingDogFilters[i])[x]);
        }
      }

      if (this.filteringService.huntingDogNameFilter) {
        this.huntingDogs = this.huntingDogs.filter(item => item.name.toLowerCase().includes(this.filteringService.huntingDogNameFilter.toLowerCase()));
      }

    } else {
      this.huntingDogs = this.fetchLocalDataService.localDataToLoad;
    }

    if (quickSearchFilter) {
      this.huntingDogs = this.huntingDogs.filter(item => item.name.toLowerCase().includes(quickSearchFilter.toLowerCase()))
    }

    this.isOdd = this.fetchLocalDataService.isOdd;

    this.isFilteringOn = false;
  }

  searchEvent(event) {
    console.log(event.detail.value);
    this.huntingDogsFiltered = [];
  }

  async presentModal() {
    const modal = await this.modalController.create({
                                                      component: VadaszkutyakFilterComponent,
                                                      cssClass: 'my-custom-class'
                                                    });
    return await modal.present();
  }

  quickSearch(event) {
    this.fetchHuntingDogsData(event.detail.value).then(r => this.dataLoaded = Promise.resolve(true));
  }

}
