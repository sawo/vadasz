import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchLocalDataService } from '../../services/fetch-local-data.service';
import { AnimalModel } from '../../allathatarozo/animal.model';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vadaszkutyak-details',
  templateUrl: './vadaszkutyak-details.component.html',
  styleUrls: ['./vadaszkutyak-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class VadaszkutyakDetailsComponent implements OnInit {

  private passedData: number;
  private dogs;
  public dataLoaded: Promise<boolean>;
  public currentDog;
  private currentDogLink: string;
  private filterByUrl: {};

  constructor(private route: ActivatedRoute, public fetchLocalDataService: FetchLocalDataService) { }

  ngOnInit() {
    this.passedData = history.state.data;
    this.fetchDogData().then(r => this.dataLoaded = Promise.resolve(true));
  }

  async fetchDogData() {
    await this.fetchLocalDataService.loadLocalRegister('vadaszkutyak');
    this.dogs = this.fetchLocalDataService.localDataToLoad;
    this.fillCurrentDogData();
  }

  fillCurrentDogData() {
    if (this.passedData) {
      this.currentDog = this.dogs[this.passedData];
    } else {
      this.route.paramMap.subscribe(params => {
        this.currentDogLink = params.get('name');
      });
      this.filterByUrl = {linkName: this.currentDogLink};
      this.filterByUrlFunction(this.dogs, this.currentDogLink);
    }
  }

  filterByUrlFunction(obj, filter) {
    for (let i = 0; i < Object.keys(obj).length; i++) {
      if (obj[i].linkName === filter) {
        this.currentDog = obj[i];
      }
    }
  }

  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 400
  };

}
