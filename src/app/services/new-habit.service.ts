import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class newHabitService {
  private habitNameSource = new BehaviorSubject<string>("habit");
  currentHabitName = this.habitNameSource.asObservable();

  constructor() {}
  newHabit = (habitName: string) => {
    this.habitNameSource.next(habitName);
  };
}
