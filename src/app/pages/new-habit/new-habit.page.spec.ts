import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewHabitPage } from './new-habit.page';

describe('NewHabitPage', () => {
  let component: NewHabitPage;
  let fixture: ComponentFixture<NewHabitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHabitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewHabitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
