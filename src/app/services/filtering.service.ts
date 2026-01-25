import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
              providedIn: 'root'
            })
export class FilteringService {
  public filters = false;
  private unsortedHuntingDogFilters = {};
  public sortedHuntingDogFilters = [];
  public huntingDogNameFilter: string;
  public isHuntingDogFilteringRequired: Subject<boolean> = new Subject();
  public isAnimalFilteringRequired: Subject<boolean> = new Subject();
  public animalFilterByName: string;
  public animalFilterByLatinName: string;
  public animalFilterByDescription: string;
  public animalCheckboxValues = {
    bird: false,
    mammal: false,
    huntable: false,
    notHuntable: false,
  };
  public huntingSeasonCheckbox = {
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

  constructor() {
  }

  huntingDogFiltering(unsortedFilters, nameFilter) {
    this.filters = true;
    this.sortedHuntingDogFilters = [];
    this.unsortedHuntingDogFilters = unsortedFilters;
    this.huntingDogNameFilter = nameFilter;

    for (let i = 0; i < Object.keys(this.unsortedHuntingDogFilters).length; i++) {
      if (this.unsortedHuntingDogFilters[Object.keys(this.unsortedHuntingDogFilters)[i]]) {
        this.sortedHuntingDogFilters.push(Object.keys(this.unsortedHuntingDogFilters)[i]);
      }
    }
    if (this.sortedHuntingDogFilters || this.huntingDogNameFilter) {
      this.isHuntingDogFilteringRequired.next();
    }
  }

  animalFiltering(animalCheckboxValues, animalFilterByName, animalFilterByLatinName, animalFilterByDescription, huntingSeasonCheckbox) {
    this.filters = true;
    this.animalFilterByName = animalFilterByName;
    this.animalFilterByLatinName = animalFilterByLatinName;
    this.animalFilterByDescription = animalFilterByDescription;
    this.animalCheckboxValues = animalCheckboxValues;
    this.huntingSeasonCheckbox = huntingSeasonCheckbox;

    this.isAnimalFilteringRequired.next();
  }

  resetFilters(type) {
    this.filters = false;
    switch (type) {
      case "animal":
        this.isAnimalFilteringRequired.next();
        break;
      case "huntingDog":
        this.isHuntingDogFilteringRequired.next();
        break;
    }
  }
}

