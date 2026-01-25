import {HuntingseasonModel} from './huntingseason.model';

export class AnimalModel {
    constructor(public name?: string,
                public nameInLatin?: string,
                public category?: string,
                public huntable?: boolean,
                public picture?: string,
                public footprint?: string,
                public description?: string,
                public huntingSeasons?: HuntingseasonModel[],
                public id?: number,
                public linkName?: string) {}
}

