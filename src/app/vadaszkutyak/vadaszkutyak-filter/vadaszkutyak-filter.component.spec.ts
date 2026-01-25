import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VadaszkutyakFilterComponent } from './vadaszkutyak-filter.component';

describe('VadaszkutyakFilterComponent', () => {
  let component: VadaszkutyakFilterComponent;
  let fixture: ComponentFixture<VadaszkutyakFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VadaszkutyakFilterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VadaszkutyakFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
