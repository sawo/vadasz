export class Question {
    constructor(public question?: string,
                public answers?: string[],
                public correctAnswerId?: number,
                public tags?: string[]) {}
}

