import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProgressPageRoutingModule } from "./progress-routing.module";

import { ProgressPage } from "./progress.page";
import { ChartsModule } from "ng2-charts";
import { WeeklyAvgComponent } from "src/app/components/weekly-avg/weekly-avg.component";
import { MonthlyAvgComponent } from "src/app/components/monthly-avg/monthly-avg.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressPageRoutingModule,
    ChartsModule,
  ],
  declarations: [ProgressPage, WeeklyAvgComponent, MonthlyAvgComponent],
})
export class ProgressPageModule {}
