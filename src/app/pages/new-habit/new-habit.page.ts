import { Component, OnInit } from "@angular/core";
import { newHabitService } from "src/app/services/new-habit.service";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { CreateHabitComponent } from "src/app/components/modals/create-habit/create-habit.component";

@Component({
  selector: "app-new-habit",
  templateUrl: "./new-habit.page.html",
  styleUrls: ["./new-habit.page.scss"],
})
export class NewHabitPage implements OnInit {
  constructor(
    private newHabitSrv: newHabitService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}
  addHabit = (habitName: string) => {
    this.newHabitSrv.newHabit(habitName);
    this.router.navigate(["/add-habit", { id: habitName }]);
  };
  createHabit = async () => {
    const modal = await this.modalCtrl.create({
      component: CreateHabitComponent,
    });
    return await modal.present();
  };
}
