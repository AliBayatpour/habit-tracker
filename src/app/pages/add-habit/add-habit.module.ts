import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHabitPageRoutingModule } from './add-habit-routing.module';

import { AddHabitPage } from './add-habit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddHabitPageRoutingModule
  ],
  declarations: [AddHabitPage]
})
export class AddHabitPageModule {}
