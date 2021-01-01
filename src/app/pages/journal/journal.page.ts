import { Component, OnInit, OnDestroy } from "@angular/core";
import { Habit } from "src/app/models/habit.model";
import { JournalService } from "src/app/services/journal.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-journal",
  templateUrl: "./journal.page.html",
  styleUrls: ["./journal.page.scss"],
})
export class JournalPage implements OnInit, OnDestroy {
  habits: Habit[];
  isLoading = false;
  todayHabits = [];
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
  constructor(private journalSrv: JournalService) {}

  ngOnInit() {
    this.habitsSub = this.journalSrv.habits.subscribe((habits) => {
      this.habits = habits;
      let todayDate = new Date();
      this.setTodayHabits(habits, this.weekday[todayDate.getDay()]);
    });
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.journalSrv.fetchPlaces().subscribe((resData) => {
      this.isLoading = false;
    });
  }
  ngOnDestroy() {
    if (this.habitsSub) {
      this.habitsSub.unsubscribe();
    }
  }
  eventSource = [];
  calendar = {
    mode: "week",
    currentDate: new Date(),
  };
  onCurrentDateChanged = () => {};
  reloadSource = () => {};
  onEventSelected = (event) => {
    console.log(event);
  };
  onViewTitleChanged = () => {};
  onTimeSelected = (event) => {
    this.setTodayHabits(this.habits, this.weekday[event.selectedTime.getDay()]);
  };
  setTodayHabits = (habits: Habit[], todayDay: string) => {
    this.todayHabits = [];
    habits.forEach((habit) => {
      if (habit.repeat.includes(todayDay)) {
        console.log(habit);
        this.todayHabits.push(habit);
      }
    });
  };
}
