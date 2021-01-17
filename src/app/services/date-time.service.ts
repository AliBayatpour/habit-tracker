import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DateTimeService {
  constructor() {}
  dateWithouttime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };
}
