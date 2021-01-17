import { Component, OnInit } from "@angular/core";
import { JournalService } from "src/app/services/journal.service";
import { Subscription } from "rxjs";
import { Habit } from "src/app/models/habit.model";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.page.html",
  styleUrls: ["./progress.page.scss"],
})
export class ProgressPage implements OnInit {
  habitsSub: Subscription;
  habits: Habit[];
  constructor(private journalSrv: JournalService) {}

  ngOnInit() {
    this.habitsSub = this.journalSrv.habits.subscribe((habits) => {
      this.habits = habits;
    });
  }
}
