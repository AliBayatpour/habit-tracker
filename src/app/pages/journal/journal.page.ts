import { Component, OnInit, OnDestroy } from "@angular/core";
import { Habit } from "src/app/models/habit.model";
import { JournalService } from "src/app/services/journal.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { habitService } from "src/app/services/habit.service";
import { DateTimeService } from "src/app/services/date-time.service";

@Component({
  selector: "app-journal",
  templateUrl: "./journal.page.html",
  styleUrls: ["./journal.page.scss"],
})
export class JournalPage implements OnInit, OnDestroy {
  habits: Habit[];
  isLoading = false;
  currentDayHabits = [];
  currentDate = new Date();
  weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  private habitsSub: Subscription;
  constructor(
    private journalSrv: JournalService,
    private dateTimeSrv: DateTimeService
  ) {}

  ngOnInit() {
    this.habitsSub = this.journalSrv.habits.subscribe((habits) => {
      this.habits = habits;
      this.setHabits(this.currentDate);
    });
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.journalSrv.fetchHabits().subscribe((resData) => {
      this.isLoading = false;
    });
  }
  eventSource = [];
  calendar = {
    mode: "week",
    currentDate: new Date(),
  };
  onTimeSelected = (event) => {
    this.currentDate = new Date(event.selectedTime);
    this.setHabits(event.selectedTime);
  };

  setHabits = (date: Date) => {
    let todayDay = this.weekday[date.getDay()];
    let currentDateWithoutTime = this.dateTimeSrv.dateWithouttime(date);
    this.currentDayHabits = [];
    this.habits.forEach((habit: Habit) => {
      let convertedHabitStartDate = new Date(habit.startDate);
      let startDateWithoutTime = this.dateTimeSrv.dateWithouttime(
        convertedHabitStartDate
      );
      if (currentDateWithoutTime.getTime() >= startDateWithoutTime.getTime()) {
        if (habit.repeat.includes(todayDay)) {
          let habitRecords = habit.records ? habit.records : [];
          this.currentDayHabits.push({
            id: habit.id,
            title: habit.title,
            repeat: habit.repeat,
            userId: habit.userId,
            goals: habit.goals,
            startDate: habit.startDate,
            records: habitRecords,
          });
        }
      }
    });
  };
  ngOnDestroy() {
    if (this.habitsSub) {
      this.habitsSub.unsubscribe();
    }
  }
}
