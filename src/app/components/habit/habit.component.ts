import { Component, OnInit, Input } from "@angular/core";
import { Habit } from "src/app/models/habit.model";
import {
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { JournalService } from "src/app/services/journal.service";
import { DateTimeService } from "src/app/services/date-time.service";
import { TimerComponent } from "../modals/timer/timer.component";
import { EditHabitComponent } from "../modals/edit-habit/edit-habit.component";

@Component({
  selector: "app-habit",
  templateUrl: "./habit.component.html",
  styleUrls: ["./habit.component.scss"],
})
export class HabitComponent implements OnInit {
  @Input() habit: Habit;
  @Input() currentDate: Date;
  isFinished: boolean = false;
  isPartlyFinished: boolean = false;
  notFinished: boolean = false;
  currentDateWithoutTime: Date;
  recordDateFormat: Date;
  recordDateWithoutTime: Date;
  recordTime: number;
  recordTarget: number;
  targetIsForToday: boolean = false;
  constructor(
    private alertCtrl: AlertController,
    private journalSrv: JournalService,
    private loadingCtrl: LoadingController,
    private dateTimeSrv: DateTimeService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    let todayWitoutTime = this.dateTimeSrv.dateWithouttime(new Date());
    this.currentDateWithoutTime = this.dateTimeSrv.dateWithouttime(
      this.currentDate
    );
    if (todayWitoutTime.getTime() === this.currentDateWithoutTime.getTime()) {
      this.targetIsForToday = true;
    }
    if (this.habit.records) {
      if (this.habit.records.length) {
        this.habit.records.forEach((record) => {
          this.recordDateFormat = new Date(record.date);
          this.recordDateWithoutTime = this.dateTimeSrv.dateWithouttime(
            this.recordDateFormat
          );
          if (
            this.currentDateWithoutTime.getTime() ===
            this.recordDateWithoutTime.getTime()
          ) {
            this.recordTarget = record.target;
            this.recordTime = record.time;
            if (record.time === Number(this.habit.goals.numOption)) {
              this.isFinished = true;
            } else if (record.time > 0) {
              this.isPartlyFinished = true;
            }
          }
        });
      }
    }
    if (
      this.currentDateWithoutTime.getTime() < todayWitoutTime.getTime() &&
      !this.isFinished &&
      !this.isPartlyFinished
    ) {
      this.notFinished = true;
    }
  }
  onDeleteHabit = async (habitId: string, userId: string) => {
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
            this.journalSrv.deleteHabit(habitId, userId).subscribe(() => {
              this.loadingCtrl.dismiss();
            });
          },
        },
      ],
    });
    await alert.present();
  };
  onFinishHabit = async (habit: Habit) => {
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
            let newHabitRecord = {
              date: this.currentDateWithoutTime,
              time: Number(habit.goals.numOption),
              target: Number(habit.goals.numOption),
            };
            let newHabitRecords: { date: Date; time: number; target: number }[];
            if (habit.records) {
              newHabitRecords = [...habit.records, newHabitRecord];
            } else {
              newHabitRecords = [newHabitRecord];
            }
            this.journalSrv
              .updateHabit(habit.id, habit.repeat, habit.goals, newHabitRecords)
              .subscribe((resData) => {
                this.loadingCtrl.dismiss();
              });
          },
        },
      ],
    });
    await alert.present();
  };
  setTimer = (habit: Habit) => {
    this.presentTimerModal(habit);
  };

  async presentTimerModal(habit: Habit) {
    const modal = await this.modalCtrl.create({
      component: TimerComponent,
      cssClass: "my-custom-class",
      componentProps: {
        habit,
      },
    });
    return await modal.present();
  }

  async presentEditModal(habit: Habit) {
    const modal = await this.modalCtrl.create({
      component: EditHabitComponent,
      cssClass: "my-custom-class",
      componentProps: {
        habit,
      },
    });
    return await modal.present();
  }
}
