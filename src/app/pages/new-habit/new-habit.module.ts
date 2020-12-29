import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NewHabitPageRoutingModule } from "./new-habit-routing.module";

import { NewHabitPage } from "./new-habit.page";
import { CreateHabitComponent } from "src/app/components/modals/create-habit/create-habit.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NewHabitPageRoutingModule],
  declarations: [NewHabitPage, CreateHabitComponent],
})
export class NewHabitPageModule {}
