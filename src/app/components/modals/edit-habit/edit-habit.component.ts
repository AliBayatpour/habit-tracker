import { Component, OnInit, Input } from "@angular/core";
import {
  PickerController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { habitService } from "src/app/services/habit.service";
import { JournalService } from "src/app/services/journal.service";
import { Router } from "@angular/router";
import { stringify } from "@angular/compiler/src/util";
import { Habit } from "src/app/models/habit.model";

@Component({
  selector: "app-edit-habit",
  templateUrl: "./edit-habit.component.html",
  styleUrls: ["./edit-habit.component.scss"],
})
export class EditHabitComponent implements OnInit {
  @Input() habit: Habit;
  habitName: string;
  constructor(
    private pickerController: PickerController,
    private journalSrv: JournalService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  async presentPicker(starterUnitOption = "minute", animate = true) {
    let minNum = [];
    for (let index = 1; index < 240; index++) {
      minNum.push({
        text: stringify(index * 5),
        value: stringify(index * 5),
      });
    }
    let timeNum = [];
    for (let index = 1; index < 101; index++) {
      timeNum.push({
        text: stringify(index),
        value: stringify(index),
      });
    }
    let unitOption: any[];
    let selectIndex = 0;
    switch (starterUnitOption) {
      case "minute":
        unitOption = minNum;
        selectIndex = 0;
        break;
      default:
        unitOption = timeNum;
        selectIndex = 1;
        break;
    }

    const picker = await this.pickerController.create({
      animated: animate,
      buttons: [
        {
          text: "save",
          handler: (val) => {
            this.habit.goals.numOption = val.numOption.value;
            this.habit.goals.unit = val.unit.value;
            this.habit.goals.perUnit = val.perUnit.value;
          },
        },
      ],
      columns: [
        {
          name: "numOption",
          options: unitOption,
        },
        {
          name: "unit",
          selectedIndex: selectIndex,
          options: [
            {
              text: "mins",
              value: "mins",
            },
            {
              text: "times",
              value: "times",
            },
          ],
        },
        {
          name: "perUnit",
          options: [
            {
              text: "per day",
              value: "day",
            },
            {
              text: "per week",
              value: "week",
            },
            {
              text: "per month",
              value: "month",
            },
          ],
        },
      ],
      cssClass: "picker-goal",
      mode: "ios",
    });
    picker.present();
    picker.addEventListener("ionPickerColChange", async (event: any) => {
      if (event.detail.name === "unit" && event.detail.selectedIndex === 0) {
        unitOption = minNum;
        picker.dismiss();
        this.presentPicker("minute", false);
      } else if (
        event.detail.name === "unit" &&
        event.detail.selectedIndex === 1
      ) {
        unitOption = timeNum;
        picker.dismiss();
        this.presentPicker("time", false);
      }
    });
  }
  onRepeatSelect = (event) => {
    this.habit.repeat = event.detail.value;
  };
  onUpdateHabit = async () => {
    const loading = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
    this.journalSrv
      .updateHabit(
        this.habit.id,
        this.habit.repeat,
        this.habit.goals,
        this.habit.records ? this.habit.records : null
      )
      .subscribe(() => {
        this.loadingCtrl.dismiss();
        this.router.navigate(["/"]);
      });
  };
  dismissModal = () => {
    this.modalController.dismiss({
      dismissed: true,
    });
  };
}
