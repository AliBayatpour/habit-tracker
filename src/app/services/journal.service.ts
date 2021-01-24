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
  fetchHabits = () => {
    let habits = [];
    let myHabits = [];
    return this.authSrv.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error("No user id found");
        }
        return this.http.get<{
          [key: string]: habitData;
        }>(
          `https://habit-tracker-3c91a-default-rtdb.europe-west1.firebasedatabase.app/${userId}.json`
        );
      }),
      map((resData) => {
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
  deleteHabit = (habitId: string, userId: string) => {
    return this.http
      .delete(
        `https://habit-tracker-3c91a-default-rtdb.europe-west1.firebasedatabase.app/${userId}/${habitId}.json`
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
        return this.http.post<{ name: string }>(
          `https://habit-tracker-3c91a-default-rtdb.europe-west1.firebasedatabase.app/${userId}.json`,
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
  updateHabit = (id: string, newRecord: Date[]) => {
    let updatedHabits: Habit[];
    return this.habits.pipe(
      take(1),
      switchMap((habits) => {
        const updatedHabitIndex = habits.findIndex((habit) => habit.id === id);
        updatedHabits = [...habits];
        const oldHabit = updatedHabits[updatedHabitIndex];
        updatedHabits[updatedHabitIndex] = new Habit(
          oldHabit.id,
          oldHabit.title,
          oldHabit.repeat,
          oldHabit.userId,
          oldHabit.goals,
          oldHabit.startDate,
          newRecord
        );
        return this.http.put(
          `https://habit-tracker-3c91a-default-rtdb.europe-west1.firebasedatabase.app/${oldHabit.userId}/${id}.json`,
          { ...updatedHabits[updatedHabitIndex], id: null }
        );
      }),
      tap(() => {
        this._habits.next(updatedHabits);
      })
    );
  };
}
