import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalModel } from '../animal.model';
import { FetchLocalDataService } from '../../services/fetch-local-data.service';

@Component({
             selector: 'app-details',
             templateUrl: './details.component.html',
             styleUrls: ['./details.component.scss']
           })

export class DetailsComponent implements OnInit {
  private passedData: number;
  private animals: AnimalModel[];
  public dataLoaded: Promise<boolean>;
  public currentAnimal: AnimalModel;
  private currentAnimalLink: string;
  private filterByUrl: {};

  constructor(private route: ActivatedRoute, public fetchLocalDataService: FetchLocalDataService) {
  }

  ngOnInit() {
    this.passedData = history.state.data;
    this.fetchAnimalData().then(r => this.dataLoaded = Promise.resolve(true));
  }

  async fetchAnimalData() {
    await this.fetchLocalDataService.loadLocalRegister('allathatarozo');
    this.animals = this.fetchLocalDataService.localDataToLoad;
    this.fillCurrentAnimalData();
  }

  fillCurrentAnimalData() {
    if (this.passedData) {
      this.currentAnimal = this.animals[this.passedData];
    } else {
      this.route.paramMap.subscribe(params => {
        this.currentAnimalLink = params.get('name');
      });
      this.filterByUrl = {linkName: this.currentAnimalLink};
      this.filterByUrlFunction(this.animals, this.currentAnimalLink);
    }
  }

  filterByUrlFunction(obj, filter) {
    for (let i = 0; i < Object.keys(obj).length; i++) {
      if (obj[i].linkName === filter) {
        this.currentAnimal = obj[i];
      }
    }
  }

  getObjectKeys(obj) {
    return Object.keys(obj);
  }

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 400
  };

}
