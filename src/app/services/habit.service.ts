import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class habitService {
  private _habitNameSource = new BehaviorSubject<string>("habit");

  constructor() {}
  get newHabitName() {
    return this._habitNameSource.asObservable();
  }
  newHabit = (habitName: string) => {
    this._habitNameSource.next(habitName);
  };
}
