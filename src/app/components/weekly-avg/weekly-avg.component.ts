import { Component, OnInit, Input } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { DateTimeService } from "src/app/services/date-time.service";
import { Habit } from "src/app/models/habit.model";

@Component({
  selector: "app-weekly-avg",
  templateUrl: "./weekly-avg.component.html",
  styleUrls: ["./weekly-avg.component.scss"],
})
export class WeeklyAvgComponent implements OnInit {
  @Input("habits") habits: Habit[];
  updatedHabits: Habit[];

  currentDayHabits = [];
  weeklyAvgs = [];
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
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = chng.currentValue;
      this.updatedHabits = cur;
    }
    this.progressCalculator(this.updatedHabits);
  }

  progressCalculator = (habits: Habit[]) => {
    // GET LAST SEVEN DAYS AND PUT THEM ON THE CHARTS
    let lastSevenDays = this.dateTimeSrv.getLast7Days();

    lastSevenDays.forEach(
      (day: { dateNum: number; day: string; month: string }, idx) => {
        this.barChartsLabels[6 - idx] = `${day.month}${day.dateNum}`;
      }
    );
    // CALCULATE WEEKLY AVG
    // CALCULATE DAYLY REPORT ON EACH CHART
    this.weeklyAvgs = [];
    this.barChartsData = [];
    if (habits.length) {
      habits.forEach((habit, idx) => {
        if (habit.records) {
          let habitAvg = this.dateTimeSrv.dailyAvgPerLast7Days(habit);
          this.weeklyAvgs.push(habitAvg);
          let chartData = [0, 0, 0, 0, 0, 0, 0];
          lastSevenDays.forEach((el, idx) => {
            habitAvg.records.forEach((record: Date) => {
              if (
                this.dateTimeSrv.dateWithouttime(el.date).getTime() ===
                this.dateTimeSrv.dateWithouttime(record).getTime()
              ) {
                chartData[chartData.length - 1 - idx] = Number(
                  habit.goals.numOption
                );
              }
            });
          });
          this.barChartsData.push([
            {
              data: chartData,
              label: "Daily report",
              backgroundColor: "#428cff",
              borderColor: "#3a7be0",
              pointStyle: "star",
            },
          ]);
        }
      });
    }
  };
}
