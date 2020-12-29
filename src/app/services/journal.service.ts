import { Injectable } from "@angular/core";
import { Habit } from "../models/habit.model";
import { AuthService } from "./auth.service";
import { BehaviorSubject } from "rxjs";
import { take, map, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class JournalService {
  private _habits = new BehaviorSubject<Habit[]>([]);
  constructor(private authSrv: AuthService, private http: HttpClient) {}
  fetchPlaces = () => {
    return this.http
      .get<{
        [key: string]: habitData;
      }>(
        "https://habit-tracker-3c91a-default-rtdb.europe-west1.firebasedatabase.app/habits.json"
      )
      .pipe(
        map((resData) => {
          const habits = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              habits.push(
                new Habit(
                  key,
                  resData[key].title,
                  resData[key].repeat,
                  resData[key].userId,
                  resData[key].goals
                )
              );
            }
          }
          return habits;
        }),
        tap((habits) => {
          this._habits.next(habits);
        })
      );
  };
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
    let generatedId: string;
    const newHabit = new Habit(id, title, repeat, this.authSrv.userId, goals);
    // this._habits.pipe(
    //   take(1),
    //   tap((habits) => {
    //     this._habits.next(habits.concat(newHabit));
    //   })
    // );
    console.log("hi");
    return this.http
      .post<{ name: string }>(
        "https://habit-tracker-3c91a-default-rtdb.europe-west1.firebasedatabase.app/habits.json",
        { ...newHabit, id: null }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.habits;
        }),
        take(1),
        tap((habits) => {
          newHabit.id = generatedId;
          this._habits.next(habits.concat(newHabit));
        })
      );
  };
}
