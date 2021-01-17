import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  constructor(
    private authSrv: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}
  isLogin = true;
  ngOnInit() {}

  authenticate = async (email: string, password: string) => {
    this.authSrv.login(email, password);
    const loading = await this.loadingCtrl.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
    let authObs: Observable<AuthResponseInterface>;
    if (this.isLogin) {
      authObs = this.authSrv.login(email, password);
    } else {
      authObs = this.authSrv.signUp(email, password);
    }
    authObs.subscribe(
      (resData) => {
        loading.dismiss();
        this.router.navigateByUrl("/tabs/journal");
      },
      async (error) => {
        const code = error.error.error.message;
        let message = "Could not sign you up, please try again";
        switch (code) {
          case "EMAIL_EXISTS":
            message = "This email addres already exists";
            break;
          case "EMAIL_NOT_FOUND":
            message = "E-Mail address could not be found";
            break;
          case "INVALID_PASSWORD":
            message = "This password is not correct";
            break;
          default:
            message = error.error.error.message;
            break;
        }
        if (code === "EMAIL_EXISTS") {
          message = "This email addres exists already";
        } else if (code === "EMAIL_NOT_FOUND") {
          message = "E-Mail address could not be found";
        }
        const alert = await this.alertCtrl.create({
          cssClass: "my-custom-class",
          header: "An Error Occured",
          message: message,
          buttons: ["OK"],
        });
        loading.dismiss();
        await alert.present();
      }
    );
  };
  onSwitchAuthMode = () => {
    this.isLogin = !this.isLogin;
  };
  onSubmit = (form: NgForm) => {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authenticate(email, password);
  };
}
