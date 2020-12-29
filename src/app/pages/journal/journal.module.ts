import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JournalPageRoutingModule } from './journal-routing.module';

import { JournalPage } from './journal.page';
import { NoHabitComponent } from 'src/app/components/no-habit/no-habit.component';
import { HabitComponent } from 'src/app/components/habit/habit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JournalPageRoutingModule
  ],
  declarations: [JournalPage, NoHabitComponent, HabitComponent]
})
export class JournalPageModule {}
