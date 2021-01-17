import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { habitService } from "src/app/services/habit.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-habit",
  templateUrl: "./create-habit.component.html",
  styleUrls: ["./create-habit.component.scss"],
})
export class CreateHabitComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private newHabitSrv: habitService,
    private router: Router
  ) {}

  ngOnInit() {}
  closeModal = () => {
    this.modalCtrl.dismiss();
  };
  onSubmit = (form: NgForm) => {
    if (!form.valid) {
      return;
    }
    this.newHabitSrv.newHabit(form.value.habitName);
    this.router.navigate(["/add-habit", { id: form.value.habitName }]);
    this.modalCtrl.dismiss();
  };
}
