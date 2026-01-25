import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchLocalDataService {

  public localDataToLoad;
  public isOdd: boolean;

  constructor() { }

  loadLocalRegister = async (dataLocation) => {

    await fetch('/assets/' + dataLocation + '/' + dataLocation + '.json').then(res => res.json()).then(json => {
      this.localDataToLoad = json;
    });

    for (let i = 0; i < Object.keys(this.localDataToLoad).length; i++) {
      this.localDataToLoad[i].id = i;
      this.localDataToLoad[i].linkName = this.localDataToLoad[i].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').toLowerCase();
    }

    this.isOdd = Object.keys(this.localDataToLoad).length % 2 !== 0;
  };

  setPlaceholderImg(event) {
    event.target.src = 'assets/placeholder.png';
  }
}
