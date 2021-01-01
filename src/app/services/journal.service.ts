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
                  resData[key].goals,
                  resData[key].startDate,
                  resData[key].records
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
    return this.http
      .delete(
        `https://habit-tracker-3c91a-default-rtdb.europe-west1.firebasedatabase.app/habits/${habitId}.json`
      )
      .pipe(
        switchMap(() => {
          return this.habits;
        }),
        take(1),
        tap((habits) => {
          this._habits.next(
            habits.filter((habit) => {
              return habit.id !== habitId;
            })
          );
        })
      );
  };
  addHabit = (
    id: string,
    title: string,
    repeat: string[],
    goals: {
      numOption: string;
      unit: "mins" | "times";
      perUnit: "day" | "week" | "month";
    },
    startDate: Date,
    records: any
  ) => {
    let generatedId: string;
    let newHabit: Habit;
    return this.authSrv.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error("No user id found");
        }
        newHabit = new Habit(
          id,
          title,
          repeat,
          userId,
          goals,
          startDate,
          records
        );
        console.log(newHabit);
        return this.http.post<{ name: string }>(
          "https://habit-tracker-3c91a-default-rtdb.europe-west1.firebasedatabase.app/habits.json",
          { ...newHabit, id: null }
        );
      }),
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
