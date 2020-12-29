import { Component, OnInit, OnDestroy } from "@angular/core";
import { Habit } from "src/app/models/habit.model";
import { JournalService } from "src/app/services/journal.service";
import { AlertController } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-journal",
  templateUrl: "./journal.page.html",
  styleUrls: ["./journal.page.scss"],
})
export class JournalPage implements OnInit, OnDestroy {
  habits: Habit[];
  private habitsSub: Subscription;
  constructor(private journalSrv: JournalService) {}

  ngOnInit() {
    this.habitsSub = this.journalSrv.habits.subscribe((habits) => {
      this.habits = habits;
    });
  }
  ngOnDestroy() {
    if (this.habitsSub) {
      this.habitsSub.unsubscribe();
    }
  }
}
