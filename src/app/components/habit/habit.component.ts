import { Component, OnInit, Input } from "@angular/core";
import { Habit } from "src/app/models/habit.model";
import { AlertController, LoadingController } from "@ionic/angular";
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
    private journalSrv: JournalService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}
  onDeleteHabit = async (habitId: string) => {
    const loading = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
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
          handler: async () => {
            await loading.present();
            this.journalSrv.deleteHabit(habitId).subscribe(() => {
              this.loadingCtrl.dismiss();
            });
          },
        },
      ],
    });
    await alert.present();
  };
}
