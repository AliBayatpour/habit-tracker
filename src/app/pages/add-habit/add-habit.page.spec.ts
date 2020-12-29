import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddHabitPage } from './add-habit.page';

describe('AddHabitPage', () => {
  let component: AddHabitPage;
  let fixture: ComponentFixture<AddHabitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHabitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddHabitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
