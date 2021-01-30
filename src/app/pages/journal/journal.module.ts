import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { JournalPageRoutingModule } from "./journal-routing.module";

import { JournalPage } from "./journal.page";
import { NoHabitComponent } from "src/app/components/no-habit/no-habit.component";
import { HabitComponent } from "src/app/components/habit/habit.component";
import { NgCalendarModule } from "ionic2-calendar";
import { NgCircleProgressModule } from "ng-circle-progress";
import { TimerComponent } from "src/app/components/modals/timer/timer.component";
import { EditHabitComponent } from 'src/app/components/modals/edit-habit/edit-habit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JournalPageRoutingModule,
    NgCalendarModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      animation: false,
      responsive: true,
      renderOnClick: false,
    }),
  ],
  declarations: [JournalPage, NoHabitComponent, HabitComponent, TimerComponent, EditHabitComponent],
})
export class JournalPageModule {}
