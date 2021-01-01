import { Component, OnInit } from "@angular/core";
import { PickerController, LoadingController } from "@ionic/angular";
import { newHabitService } from "src/app/services/new-habit.service";
import { stringify } from "@angular/compiler/src/util";
import { JournalService } from "src/app/services/journal.service";
import { Habit } from "src/app/models/habit.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-habit",
  templateUrl: "./add-habit.page.html",
  styleUrls: ["./add-habit.page.scss"],
})
export class AddHabitPage implements OnInit {
  habitName: string;
  habitObj: Habit = {
    id: "abc",
    userId: "",
    title: "",
    repeat: ["Sunday", "Monday"],
    goals: {
      numOption: "5",
      unit: "mins",
      perUnit: "day",
    },
    startDate: new Date(),
    records: [],
  };
  constructor(
    private pickerController: PickerController,
    private newHabitSrv: newHabitService,
    private journalSrv: JournalService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.newHabitSrv.currentHabitName.subscribe((habitName) => {
      this.habitName = habitName;
      this.habitObj.title = habitName;
    });
  }
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
            this.habitObj.goals.numOption = val.numOption.value;
            this.habitObj.goals.unit = val.unit.value;
            this.habitObj.goals.perUnit = val.perUnit.value;
            console.log(this.habitObj);
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
    this.habitObj.repeat = event.detail.value;
    console.log(event);
  };
  onAddHabit = async () => {
    const loading = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
    this.journalSrv
      .addHabit(
        this.habitObj.id,
        this.habitObj.title,
        this.habitObj.repeat,
        this.habitObj.goals,
        this.habitObj.startDate,
        this.habitObj.records
      )
      .subscribe(() => {
        this.loadingCtrl.dismiss();
        this.router.navigate(["/"]);
      });
  };
}
