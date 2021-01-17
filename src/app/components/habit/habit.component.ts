import { Component, OnInit, Input } from "@angular/core";
import { Habit } from "src/app/models/habit.model";
import { AlertController, LoadingController } from "@ionic/angular";
import { JournalService } from "src/app/services/journal.service";
import { DateTimeService } from "src/app/services/date-time.service";

@Component({
  selector: "app-habit",
  templateUrl: "./habit.component.html",
  styleUrls: ["./habit.component.scss"],
})
export class HabitComponent implements OnInit {
  @Input() habit: Habit;
  @Input() currentDate: Date;
  isFinished: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private journalSrv: JournalService,
    private loadingCtrl: LoadingController,
    private dateTimeSrv: DateTimeService
  ) {}

  ngOnInit() {
    let currentDateWithoutTime: Date;
    let recordDateFormat: Date;
    let recordDateWithoutTime: Date;
    if (this.habit.records) {
      if (this.habit.records.length) {
        currentDateWithoutTime = this.dateTimeSrv.dateWithouttime(
          this.currentDate
        );
        this.habit.records.forEach((record) => {
          recordDateFormat = new Date(record);
          recordDateWithoutTime = this.dateTimeSrv.dateWithouttime(
            recordDateFormat
          );
          if (
            currentDateWithoutTime.getTime() === recordDateWithoutTime.getTime()
          ) {
            this.isFinished = true;
          }
        });
      }
    }
  }
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
  onFinishedHabit = async (habit: Habit) => {
    const loading = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    const alert = await this.alertCtrl.create({
      header: "Done?",
      message:
        "Congratulations! if you are finished this habit click on Finished",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Finished",
          handler: async () => {
            await loading.present();
            let newHabitRecord = this.currentDate;
            let newHabitRecords: Date[];
            if (habit.records) {
              newHabitRecords = [...habit.records, newHabitRecord];
            } else {
              newHabitRecords = [newHabitRecord];
            }
            this.journalSrv
              .updateHabit(habit.id, newHabitRecords)
              .subscribe((resData) => {
                this.loadingCtrl.dismiss();
              });
          },
        },
      ],
    });
    await alert.present();
  };
}
