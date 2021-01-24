import { Component, OnInit, OnDestroy } from "@angular/core";
import { JournalService } from "src/app/services/journal.service";
import { Subscription } from "rxjs";
import { Habit } from "src/app/models/habit.model";
import { DateTimeService } from "src/app/services/date-time.service";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.page.html",
  styleUrls: ["./progress.page.scss"],
})
export class ProgressPage implements OnInit, OnDestroy {
  habits: Habit[];
  isLoading = false;
  habitsSub: Subscription;
  avgOption = "perWeek";

  constructor(private journalSrv: JournalService) {}

  ngOnInit() {
    this.habitsSub = this.journalSrv.habits.subscribe((habits) => {
      this.habits = habits;
    });
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.journalSrv.fetchHabits().subscribe((resData) => {
      this.isLoading = false;
    });
  }
  changeInterval = (event: any) => {
    this.avgOption = event.detail.value;
    console.log(this.avgOption);
  };

  ngOnDestroy() {
    if (this.habitsSub) {
      this.habitsSub.unsubscribe();
    }
  }
}
