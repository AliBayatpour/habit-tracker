import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.scss"],
})
export class TimerComponent implements OnInit {
  percent = 0;
  radius = 100;
  timer: any = false;
  proggress = 0;
  minute = 1;
  seconds = 30;
  constructor() {}

  ngOnInit() {}
  startTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = false;
    this.percent = 0;
    this.proggress = 0;
    this.timer = setInterval(() => {
      if (this.percent === this.radius) {
        clearInterval(this.timer);
      }
      this.percent = Math.floor((this.proggress / 20) * 100);
      this.proggress++;
    }, 1000);
  };
}
