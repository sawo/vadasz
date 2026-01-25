import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VadaszkutyakDetailsComponent } from './vadaszkutyak-details.component';

describe('VadaszkutyakDetailsComponent', () => {
  let component: VadaszkutyakDetailsComponent;
  let fixture: ComponentFixture<VadaszkutyakDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VadaszkutyakDetailsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VadaszkutyakDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
