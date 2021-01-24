import { Injectable } from "@angular/core";
import { Habit } from "../models/habit.model";

@Injectable({
  providedIn: "root",
})
export class DateTimeService {
  constructor() {}
  dateWithouttime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };
  dailyAvgPerLast7Days = (habit: Habit) => {
    let accomplishedTime = 0;
    let today = new Date();
    let prevDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    let last7Days = new Date(
      prevDay.getFullYear(),
      prevDay.getMonth(),
      prevDay.getDate() - 7
    );
    let records = [];
    habit.records.forEach((record) => {
      let recordDate = new Date(record);
      if (
        recordDate.getTime() >= last7Days.getTime() &&
        recordDate.getTime() <= prevDay.getTime()
      ) {
        records.push(recordDate);
        accomplishedTime = accomplishedTime + Number(habit.goals.numOption);
      }
    });
    return {
      habitTitle: habit.title,
      records,
      dailyAvgPerLast7Days: Math.round(accomplishedTime / 7),
    };
  };
  getLast7Days = () => {
    let today = new Date();
    let lastSevenDays = [];
    for (let i = 1; i <= 7; i++) {
      let prevDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      );
      lastSevenDays.push({
        date: prevDay,
        dateNum: prevDay.getDate(),
        month: prevDay.toLocaleString("default", { month: "short" }),
      });
    }
    return lastSevenDays;
  };
  getLast4Weeks = () => {
    let today = new Date();
    let yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    let last4Weeks = [];
    for (let i = 0; i <= 3; i++) {
      let prevWeek = new Date(
        yesterday.getFullYear(),
        yesterday.getMonth(),
        yesterday.getDate() - i * 7
      );
      last4Weeks.push({
        date: prevWeek,
        dateNum: prevWeek.getDate(),
        month: prevWeek.toLocaleString("default", { month: "short" }),
      });
    }
    return last4Weeks;
  };
  getLast4WeeksWeeklyAvg = (habit: Habit) => {
    let accomplishedTime = 0;
    let today = new Date();
    let yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    let weeklyReport = {
      week1: 0,
      week2: 0,
      week3: 0,
      week4: 0,
    };
    let last28Days = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate() - 28
    );
    let records = [];
    habit.records.forEach((record) => {
      let recordDate = new Date(record);
      if (
        recordDate.getTime() >= last28Days.getTime() &&
        recordDate.getTime() <= today.getTime()
      ) {
        if (recordDate.getTime() <= this.getLast4Weeks()[3].date.getTime()) {
          weeklyReport.week1 =
            weeklyReport.week1 + Number(habit.goals.numOption);
        } else if (
          recordDate.getTime() <= this.getLast4Weeks()[2].date.getTime()
        ) {
          weeklyReport.week2 =
            weeklyReport.week2 + Number(habit.goals.numOption);
        } else if (
          recordDate.getTime() <= this.getLast4Weeks()[1].date.getTime()
        ) {
          weeklyReport.week3 =
            weeklyReport.week3 + Number(habit.goals.numOption);
        } else if (
          recordDate.getTime() <= this.getLast4Weeks()[0].date.getTime()
        ) {
          weeklyReport.week4 =
            weeklyReport.week4 + Number(habit.goals.numOption);
        }
        records.push(recordDate);
        accomplishedTime = accomplishedTime + Number(habit.goals.numOption);
      }
    });
    return {
      habitTitle: habit.title,
      weeklyReport,
      records,
      WeeklyAvgPerLast28Days: Math.round(accomplishedTime / 28),
      WeeklyAvg: `${Math.floor(accomplishedTime / 240)}h : ${
        (accomplishedTime / 4) % 60
      }m`,
      totalTime: `${Math.floor(accomplishedTime / 60)}h : ${
        accomplishedTime % 60
      }m`,
    };
  };

  getLastYearMonths = () => {
    let today = new Date();
    let yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    let last4Weeks = [];
    for (let i = 0; i <= 3; i++) {
      let prevWeek = new Date(
        yesterday.getFullYear(),
        yesterday.getMonth(),
        yesterday.getDate() - i * 7
      );
      last4Weeks.push({
        date: prevWeek,
        dateNum: prevWeek.getDate(),
        month: prevWeek.toLocaleString("default", { month: "short" }),
      });
    }
    return last4Weeks;
  };
}
