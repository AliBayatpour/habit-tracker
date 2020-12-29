import { Component, OnInit, Input } from "@angular/core";
import { Habit } from "src/app/models/habit.model";
import { AlertController } from "@ionic/angular";
import { JournalService } from "src/app/services/journal.service";

@Component({
  selector: "app-habit",
  templateUrl: "./habit.component.html",
  styleUrls: ["./habit.component.scss"],
})
export class HabitComponent implements OnInit {
  @Input() habit: Habit;
  constructor(
    private alertCtrl: AlertController,
    private journalSrv: JournalService
  ) {}

  ngOnInit() {}
  onDeleteHabit = async (habitId: string) => {
    const alert = await this.alertCtrl.create({
      header: "Are you sure?",
      message: "Do you really want to delete the habit?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Delete",
          handler: () => {
            this.journalSrv.deleteHabit(habitId);
          },
        },
      ],
    });
    await alert.present();
  };
}
