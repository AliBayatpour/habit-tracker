import { Injectable } from "@angular/core";
import { Habit } from "../models/habit.model";
import { AuthService } from "./auth.service";
import { BehaviorSubject } from "rxjs";
import { take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class JournalService {
  private _habits = new BehaviorSubject<Habit[]>([
    new Habit("read_books", "Read Books", ["Sunday", "Monday"], "123", {
      numOption: "7",
      unit: "times",
      perUnit: "day",
    }),
  ]);
  constructor(private authSrv: AuthService) {}

  get habits() {
    return this._habits.asObservable();
  }
  getHabit = (habitId: string) => {
    return this.habits.pipe(
      take(1),
      map((habits) => {
        return {
          ...habits.find((habit) => habit.id === habitId),
        };
      })
    );
  };
  deleteHabit = (habitId: string) => {
    console.log(this._habits);
    this._habits.pipe(take(1)).subscribe((habits) => {
      this._habits.next(
        habits.filter((habit) => {
          return habit.id !== habitId;
        })
      );
    });
  };
  addHabit = (
    id: string,
    title: string,
    repeat: string[],
    goals: {
      numOption: string;
      unit: "mins" | "times";
      perUnit: "day" | "week" | "month";
    }
  ) => {
    const newHabit = new Habit(id, title, repeat, this.authSrv.userId, goals);
    this._habits.pipe(take(1)).subscribe((habits) => {
      this._habits.next(habits.concat(newHabit));
    });
  };
}
