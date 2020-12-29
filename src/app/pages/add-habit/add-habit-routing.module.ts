import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHabitPage } from './add-habit.page';

const routes: Routes = [
  {
    path: '',
    component: AddHabitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHabitPageRoutingModule {}
