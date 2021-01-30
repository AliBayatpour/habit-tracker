import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditHabitComponent } from './edit-habit.component';

describe('EditHabitComponent', () => {
  let component: EditHabitComponent;
  let fixture: ComponentFixture<EditHabitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHabitComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
