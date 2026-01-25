import { Component, OnInit, inject } from '@angular/core';
import {AnimalModel} from './animal.model';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {FilterComponent} from './filter/filter.component';
import {FetchLocalDataService} from '../services/fetch-local-data.service';
import {FilteringService} from '../services/filtering.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-allathatarozo',
    templateUrl: './allathatarozo.page.html',
    styleUrls: ['./allathatarozo.page.scss'],
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule,
    ]
})
export class AllathatarozoPage implements OnInit {
    modalController = inject(ModalController);
    fetchLocalDataService = inject(FetchLocalDataService);
    filteringService = inject(FilteringService);
    routerOutlet = inject(IonRouterOutlet);


    public animals: AnimalModel[];
    public dataLoaded: Promise<boolean>;
    public isOdd: boolean;
    private isFilteringOn = false;

    constructor() {
        this.filteringService.isAnimalFilteringRequired.subscribe(value => {
            this.fetchAnimalData().then(r => this.dataLoaded = Promise.resolve(true));
            this.isFilteringOn = this.filteringService.filters;
        });
    }

    ngOnInit() {
        this.fetchAnimalData().then(r => this.dataLoaded = Promise.resolve(true));
    }

    async fetchAnimalData(quickSearchFilter?) {
        await this.fetchLocalDataService.loadLocalRegister('allathatarozo');

        if (this.isFilteringOn) {
            this.animals = [];
            let huntingSeasonFilters = false;

            for (let i = 0; i < 12; i++) {
                if (this.filteringService.huntingSeasonCheckbox[i]) {
                    huntingSeasonFilters = true;
                }
                let month: string;
                switch (Object.keys(this.filteringService.huntingSeasonCheckbox)[i]) {
                    case '1':
                        month = 'jan';
                        break;
                    case '2':
                        month = 'feb';
                        break;
                    case '3':
                        month = 'mar';
                        break;
                    case '4':
                        month = 'apr';
                        break;
                    case '5':
                        month = 'may';
                        break;
                    case '6':
                        month = 'jun';
                        break;
                    case '7':
                        month = 'jul';
                        break;
                    case '8':
                        month = 'aug';
                        break;
                    case '9':
                        month = 'sep';
                        break;
                    case '10':
                        month = 'oct';
                        break;
                    case '11':
                        month = 'nov';
                        break;
                    case '12':
                        month = 'dec';
                        break;
                }

                const allAnimals = this.fetchLocalDataService.localDataToLoad;
                for (const animal of allAnimals) {
                    animal.monthPoints = 0;
                    const huntingSeasons = animal.huntingSeasons;
                    for (const season of huntingSeasons) {
                        animal.monthPoints += season.months[month];
                    }
                }

                const huntedInThisMonth = allAnimals.filter(item => (item.monthPoints));
                if (this.filteringService.huntingSeasonCheckbox[i + 1]) {
                    for (const hunted of huntedInThisMonth) {
                        let alreadyInDatabase = false;
                        for (const animal of this.animals) {
                            if (animal.id === hunted.id) {
                                alreadyInDatabase = true;
                                break;
                            }
                        }

                        if (!alreadyInDatabase) {
                            this.animals.push(hunted);
                        }
                    }
                }
            }

            if (!huntingSeasonFilters) {
                this.animals = this.fetchLocalDataService.localDataToLoad;
            }

            if (this.filteringService.animalCheckboxValues.bird && !this.filteringService.animalCheckboxValues.mammal) {
                this.animals = this.animals.filter(item => item.category === 'Madarak');
            }

            if (this.filteringService.animalCheckboxValues.mammal && !this.filteringService.animalCheckboxValues.bird) {
                this.animals = this.animals.filter(item => item.category === 'Emlősök');
            }

            if (this.filteringService.animalCheckboxValues.huntable && !this.filteringService.animalCheckboxValues.notHuntable) {
                this.animals = this.animals.filter(item => item.huntable === true);
            }

            if (this.filteringService.animalCheckboxValues.notHuntable && !this.filteringService.animalCheckboxValues.huntable) {
                this.animals = this.animals.filter(item => item.huntable === false);
            }

            if (this.filteringService.animalFilterByName) {
                this.animals = this.animals.filter(item => item.name.toLowerCase().includes(this.filteringService.animalFilterByName.toLowerCase()));
            }

            if (this.filteringService.animalFilterByLatinName) {
                this.animals = this.animals.filter(item => item.nameInLatin.toLowerCase().includes(this.filteringService.animalFilterByLatinName.toLowerCase()));
            }

            if (this.filteringService.animalFilterByDescription) {
                this.animals = this.animals.filter(item => item.description.toLowerCase().includes(this.filteringService.animalFilterByDescription.toLowerCase()));
            }

        } else {
            this.animals = this.fetchLocalDataService.localDataToLoad;
        }

        if (quickSearchFilter) {
            this.animals = this.animals.filter(item => item.name.toLowerCase().includes(quickSearchFilter.toLowerCase()));
        }

        this.isOdd = this.fetchLocalDataService.isOdd;

        this.isFilteringOn = false;
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: FilterComponent,
            cssClass: 'my-custom-class',
            presentingElement: this.routerOutlet.nativeEl
        });
        return await modal.present();
    }

    quickSearch(event) {
        this.fetchAnimalData(event.detail.value).then(r => this.dataLoaded = Promise.resolve(true));
    }

}
