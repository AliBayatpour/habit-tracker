import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";

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
  timeRemained: any = "00:00:00";
  distance = 0;
  timerStatus: "start" | "pause" | "resume" = "start";

  constructor(
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.restartTimer();
  }
  pad = (n) => {
    return n < 10 ? "0" + n : n;
  };
  countTimer = (goal: number) => {
    this.timer = false;
    this.timer = setInterval(() => {
      this.distance = this.distance - 1;
      let hours = Math.floor(this.distance / (60 * 60));
      let minutes = Math.floor((this.distance % (60 * 60)) / 60);
      let seconds = Math.floor(this.distance % 60);
      this.timeRemained = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(
        seconds
      )}`;
      this.proggress++;
      this.percent = Math.floor((this.proggress / goal) * 100);
      if (this.proggress === goal) {
        clearInterval(this.timer);
      }
    }, 1000);
  };
  startTimer = () => {
    this.timerStatus = "pause";
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.distance = 200;
    this.countTimer(200);
  };
  resumeTimer = () => {
    this.timerStatus = "pause";
    console.log("hi");
    this.countTimer(200);
  };
  pauseTimer = () => {
    this.timerStatus = "resume";
    console.log("clear");
    if (this.timer) {
      clearInterval(this.timer);
    }
  };
  restartTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.percent = 0;
    this.proggress = 0;
    this.distance = 200;
    let hours = Math.floor(this.distance / (60 * 60));
    let minutes = Math.floor((this.distance % (60 * 60)) / 60);
    let seconds = Math.floor(this.distance % 60);
    this.timeRemained = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(
      seconds
    )}`;
    this.timerStatus = "start";
  };
  restartTimerAlert = async () => {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Restart",
      message: "Are you sure you want to restart the timer?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Restart",
          cssClass: "dangerAlert",
          handler: () => {
            this.restartTimer();
          },
        },
      ],
    });
    await alert.present();
  };
  dismissModalAlert = async () => {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Cancel the Timer!",
      message: "Are you sure you want to cancel the timer?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Yes",
          cssClass: "dangerAlert",
          handler: () => {
            this.dismissModal();
          },
        },
      ],
    });
    await alert.present();
  };
  dismissModal = () => {
    this.modalController.dismiss({
      dismissed: true,
    });
  };
}
