import { Component, OnInit, inject } from '@angular/core';
import {ModalController} from "@ionic/angular";
import { FilteringService } from '../../services/filtering.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class FilterComponent implements OnInit {
  modalCtrl = inject(ModalController);
  filteringService = inject(FilteringService);


  public filterByName: string;
  public filterByLatinName: string;
  public filterByDescription: string;

  checkboxValues: CheckboxValues = {
    bird: true,
    mammal: true,
    huntable: true,
    notHuntable: true,
  };

  huntingSeasonCheckbox = {
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
    "9": false,
    "10": false,
    "11": false,
    "12": false
  };

  validFilter = true;
  huntableError = false;
  categoryError = false;

  ngOnInit() {}

  checkboxValuesEvent(event) {
    let value = event.detail.value;
    let isChecked = event.detail.checked;
    this.checkboxValues[value] = isChecked;
    if (isChecked) {
      this.validFilter = true;
      if (value === 'bird' || value === 'mammal') {
        this.categoryError = false;
      }
      if (value === 'huntable' || value === 'notHuntable') {
        this.huntableError = false;
      }
    }
  }

  huntingSeasonCheckboxEvent(event) {
    let value = event.detail.value;
    this.huntingSeasonCheckbox[value] = event.detail.checked;
  }

  search() {
    if (this.checkboxValues.huntable === false && this.checkboxValues.notHuntable === false) {
      this.validFilter = false;
      this.huntableError = true;
    }
    if (this.checkboxValues.bird === false && this.checkboxValues.mammal === false) {
      this.validFilter = false;
      this.categoryError = true;
    }

    if (this.validFilter) {
      this.filteringService.animalFiltering(this.checkboxValues, this.filterByName, this.filterByLatinName, this.filterByDescription, this.huntingSeasonCheckbox);
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }
    // console.log(this.validFilter);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  resetFilters() {
    this.filteringService.resetFilters("animal");
    this.modalCtrl.dismiss({
                             'dismissed': true
                           });
  }
}

export class CheckboxValues {
  bird: boolean;
  mammal: boolean;
  huntable: boolean;
  notHuntable: boolean;
}
