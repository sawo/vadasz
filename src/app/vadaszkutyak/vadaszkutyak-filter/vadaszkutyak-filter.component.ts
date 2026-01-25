import { Component, OnInit, inject } from '@angular/core';
import {ModalController} from "@ionic/angular";
import { FilteringService } from '../../services/filtering.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vadaszkutyak-filter',
  templateUrl: './vadaszkutyak-filter.component.html',
  styleUrls: ['./vadaszkutyak-filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class VadaszkutyakFilterComponent implements OnInit {
  modalCtrl = inject(ModalController);
  filteringService = inject(FilteringService);


  public filterByName: string;

  checkboxValues: CheckboxValues = {
    ancientType: true,
    retrievers: true,
    hatches: true,
    pickUpHuntingDogs: true,
    excavators: true,
    wildBoarDogs: true,
    bloods: true,
  };

  checkboxKeys = ["ancientType", "retrievers", "hatches", "pickUpHuntingDogs", "excavators", "wildBoarDogs", "bloods"];

  validFilter = true;
  categoryError = false;

  ngOnInit() {}

  checkboxValuesEvent(event) {
    let value = event.detail.value;
    let isChecked = event.detail.checked;
    this.checkboxValues[value] = isChecked;
    if (isChecked) {
      this.validFilter = true;
      this.isThereTrue();
    }
  }

  search() {
    this.isThereTrue();

    if (this.validFilter) {
      this.filteringService.huntingDogFiltering(this.checkboxValues, this.filterByName);
      this.modalCtrl.dismiss({
                               'dismissed': true
                             });
    }
  }

  isThereTrue() {
    for (let i = 0; i < Object.keys(this.checkboxValues).length; i++) {
      if (this.checkboxValues[this.checkboxKeys[i]] === true) {
        this.validFilter = true;
        break;
      } else {this.categoryError = true; this.validFilter = false}
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
                             'dismissed': true
                           });
  }

  resetFilters() {
    this.filteringService.resetFilters("huntingDog");
    this.modalCtrl.dismiss({
                             'dismissed': true
                           });
  }

}

export class CheckboxValues {
  ancientType: boolean;
  retrievers: boolean;
  hatches: boolean;
  pickUpHuntingDogs: boolean;
  excavators: boolean;
  wildBoarDogs: boolean;
  bloods: boolean;
}
