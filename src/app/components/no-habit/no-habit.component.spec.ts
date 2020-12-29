import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoHabitComponent } from './no-habit.component';

describe('NoHabitComponent', () => {
  let component: NoHabitComponent;
  let fixture: ComponentFixture<NoHabitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoHabitComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
