import { Component, OnInit, Input } from "@angular/core";
import { Habit } from "src/app/models/habit.model";
import { ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";
import { DateTimeService } from "src/app/services/date-time.service";

@Component({
  selector: "app-monthly-avg",
  templateUrl: "./monthly-avg.component.html",
  styleUrls: ["./monthly-avg.component.scss"],
})
export class MonthlyAvgComponent implements OnInit {
  @Input("habits") habits: Habit[];
  updatedHabits: Habit[];

  currentDayHabits = [];
  monthlyAvgs = [];
  constructor(private dateTimeSrv: DateTimeService) {}
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartsLabels: Label[] = [];
  barChartType: ChartType = "line";
  barChartLegend = true;
  barChartPlugins = [];
  barChartsData = [];

  ngOnInit() {}
  ngOnChanges(changes) {
    console.log(changes);
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = chng.currentValue;
      this.updatedHabits = cur;
    }
    console.log(this.updatedHabits);
    this.progressCalculator(this.updatedHabits);
  }

  progressCalculator = (habits: Habit[]) => {
    // GET LAST SEVEN DAYS AND PUT THEM ON THE CHARTS
    let last4Weeks = this.dateTimeSrv.getLast4Weeks();
    last4Weeks.forEach(
      (weekDay: { dateNum: number; day: string; month: string }, idx) => {
        this.barChartsLabels[3 - idx] = `${weekDay.month}${weekDay.dateNum}`;
      }
    );
    console.log(this.barChartsLabels);
    // CALCULATE MONTHLY AVG
    // CALCULATE MONTHLY REPORT ON EACH CHART
    this.monthlyAvgs = [];
    this.barChartsData = [];
    if (habits.length) {
      habits.forEach((habit, idx) => {
        if (habit.records) {
          let habitAvg = this.dateTimeSrv.getLast4WeeksWeeklyAvg(habit);
          this.monthlyAvgs.push(habitAvg);
          this.barChartsData.push([
            {
              data: [
                habitAvg.weeklyReport.week1,
                habitAvg.weeklyReport.week2,
                habitAvg.weeklyReport.week3,
                habitAvg.weeklyReport.week4,
              ],
              label: "Weekly report",
              backgroundColor: "#3dc2ff",
              borderColor: "#349ccc",
              pointStyle: "star",
            },
          ]);
        }
      });
    }
  };
}
