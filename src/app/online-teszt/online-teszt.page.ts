import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Question } from './question.model';
import { Answer } from './answer.model';
import { Animation, AnimationController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, ChartData, ChartOptions, ChartType, ArcElement, Tooltip, Legend, PieController } from 'chart.js';


import { BaseChartDirective } from 'ng2-charts';

@Component({
             selector: 'app-online-teszt',
             templateUrl: './online-teszt.page.html',
             styleUrls: ['./online-teszt.page.scss'],
             standalone: true,
             imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule,
                BaseChartDirective
              ],
              schemas: [CUSTOM_ELEMENTS_SCHEMA]
           })
export class OnlineTesztPage implements OnInit {
  private animationCtrl = inject(AnimationController);


  constructor() {
    Chart.register(PieController, ArcElement, Tooltip, Legend);
  }
  public selectedQuestion = 0;
  public questions: Question[];
  public answers: Answer[];
  public finished = false;
  public tags = new Set();
  public isNewGame = true;
  public numberOfQuestions: number;
  public questionAnswered = [];
  public selectedAnswer = [];
  public questionLetters = [
    'A',
    'B',
    'C',
    'D'
  ];
  public currentProgress: number;
  public progressBarValues = [];
  public correctAnswers = 0;
  public incorrectAnswers = 0;
  public unansweredQuestions = 0;
  public showChart = false;
  public counterSecond: number;
  public counterMinute: number;
  public isCounterOn: boolean;

  public type: ChartType = 'pie';
  public data: ChartData = {
    labels: [
      'Jó válasz',
      'Rossz válasz',
      'Megválaszolatlan'
    ],
    datasets: [
      {
        label: 'My First Dataset',
        data: [
          this.correctAnswers,
          this.incorrectAnswers,
          this.unansweredQuestions
        ],
        backgroundColor: [
          '#248716',
          '#b30000',
          '#996633'
        ],
        hoverOffset: 4
      }
    ]
  };
  public options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  swiper: any;
  randomCopy: any[];

  @ViewChild('slider') set slider(sliderRef: ElementRef<any>) {
    if (sliderRef) {
      this.swiper = sliderRef.nativeElement.swiper;
      if (this.swiper) {
        this.swiper.on('slideChange', () => {
          this.selectedQuestion = this.swiper.activeIndex;
          this.updateProgressBar();
        });
      }
    }
  }

  ngOnInit() {
    this.loadQADatabase();
    this.resetGame();
  }

  resetGame() {
    this.loadQADatabase();
    this.numberOfQuestions = 10;
    this.isNewGame = true;
    this.finished = false;
    this.selectedAnswer = [];
    this.questionAnswered = [];
    this.currentProgress = 0;
    this.selectedQuestion = 0;
    this.progressBarValues = [];
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.unansweredQuestions = 0;
    this.counterSecond = 0;
    this.counterMinute = 0;
    this.isCounterOn = false;
  }

  shuffle(array) {
    this.randomCopy = [];
    let n = array.length;
    let i;

    // While there remain elements to shuffle…
    while (n) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * n--);

      // And move it to the new array.
      this.randomCopy.push(array.splice(i, 1)[0]);
    }

    return this.randomCopy;
  }
  loadQADatabase() {
    this.tags = new Set();
    fetch('/assets/qa-database.json').then(res => res.json()).then(json => {
      this.questions = this.shuffle(json);
      this.questionAnswered = [];
      this.selectedAnswer = [];
      for (const question of this.questions) {
        this.questionAnswered.push(false);
      }
    }).then(() => {
      this.initAnswersArray();
    });
  }

  initAnswersArray() {
    this.answers = [];
    for (const question of this.questions) {
      this.answers.push(new Answer());
    }
  }

  answerQuestion(questionId: number, answerId: number) {
    // console.log(questionId, this.questions[questionId].correctAnswerId === answerId);
    if (!this.questionAnswered[questionId]) {
      this.answers[questionId].correct = this.questions[questionId].correctAnswerId === answerId;
      this.selectedAnswer[questionId] = answerId;
      this.questionAnswered[questionId] = true;
      this.unansweredQuestions--;
      this.updateChartData();
      if (answerId === this.questions[questionId].correctAnswerId) {
        this.nextPageOnAnswer();
      } else if (answerId !== this.questions[questionId].correctAnswerId) {
        this.animationOnWrong();
        this.nextPageOnAnswer();
      }
    }
  }

  updateChartData() {
    let correct = 0;
    let incorrect = 0;
    for (const answer of this.answers) {
      if (answer.correct) {
        correct++;
      }
      if (answer.correct === false) {
        incorrect++;
      }
    }
    this.incorrectAnswers = incorrect;
    this.correctAnswers = correct;
    this.refreshChart();
  }

  async nextPageOnAnswer() {
    await new Promise(f => setTimeout(f, 500));
    if (this.selectedQuestion < this.questions.length - 1) {
      this.selectedQuestion++;
      this.swiper.slideNext();
      this.updateProgressBar();
    }
  }

  nextPage() {
    if (this.selectedQuestion < this.questions.length - 1) {
      this.selectedQuestion++;
      this.swiper.slideNext();
      this.updateProgressBar();
    }
  }

  previousPage() {
    if (this.selectedQuestion > 0) {
      this.selectedQuestion--;
      this.swiper.slidePrev();
      this.updateProgressBar();
    }
  }

  isLastPage(): boolean {
    return this.questions !== undefined && this.selectedQuestion + 1 === this.questions.length;
  }

  isFirstPage(): boolean {
    return this.selectedQuestion !== 0;
  }

  getSuccessPercent(): number {
    let correct = 0;
    for (const answer of this.answers) {
      if (answer.correct) {
        correct++;
      }
    }
    return correct / this.questions.length;
  }

  startNewGame() {
    this.questions = this.questions.slice(0, this.numberOfQuestions);
    this.updateProgressBar();
    this.populateProgressBarValues();
    this.unansweredQuestions = this.questions.length;
    this.refreshChart();
    this.isNewGame = false;
    this.startCounter();
  }

  updateProgressBar() {
    this.currentProgress = (this.selectedQuestion + 1) / this.questions.length;
  }

  populateProgressBarValues() {
    for (let i = 0; i < this.questions.length; i++) {
      this.progressBarValues.push((i + 1) / this.questions.length);
    }
  }

  async refreshChart() {
    this.showChart = false;
    this.data.datasets[0].data = [
      this.correctAnswers,
      this.incorrectAnswers,
      this.unansweredQuestions
    ];
    await new Promise(f => setTimeout(f, 100));
    this.showChart = true;
    if (this.unansweredQuestions === 0) {
      await new Promise(f => setTimeout(f, 1000));
      this.finished = true;
      this.isCounterOn = false;
    }
  }

  async startCounter() {
    this.isCounterOn = true;
    while (this.isCounterOn) {
      if (this.counterSecond === 59) {
        this.counterMinute++;
        this.counterSecond = -1;
      }
      this.counterSecond++;
      await new Promise(f => setTimeout(f, 1000));
    }
  }

  checkFilledOutTest() {
    this.finished = false;
  }

  animationOnWrong() {
    const animation: Animation = this.animationCtrl.create()
                                     .addElement(document.querySelectorAll('.shake'))
                                     .duration(700)
                                     .iterations(1)
                                     .keyframes([
                                                  {
                                                    offset: .1,
                                                    transform: 'translate3d(-1px, 0, 0'
                                                  },
                                                  {
                                                    offset: .2,
                                                    transform: 'translate3d(2px, 0, 0'
                                                  },
                                                  {
                                                    offset: .3,
                                                    transform: 'translate3d(-4px, 0, 0'
                                                  },
                                                  {
                                                    offset: .4,
                                                    transform: 'translate3d(4px, 0, 0'
                                                  },
                                                  {
                                                    offset: .5,
                                                    transform: 'translate3d(-4px, 0, 0'
                                                  },
                                                  {
                                                    offset: .6,
                                                    transform: 'translate3d(4px, 0, 0'
                                                  },
                                                  {
                                                    offset: .7,
                                                    transform: 'translate3d(-4px, 0, 0'
                                                  },
                                                  {
                                                    offset: .8,
                                                    transform: 'translate3d(2px, 0, 0'
                                                  },
                                                  {
                                                    offset: .9,
                                                    transform: 'translate3d(-1px, 0, 0'
                                                  }
                                                ]);
    animation.play();
  }
}
