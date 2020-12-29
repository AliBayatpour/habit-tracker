import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit, OnDestroy {
  private authSub: Subscription;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSub = this.authSrv.userIsAuthenticated.subscribe((isAuth) => {
      if (!isAuth) {
        this.router.navigateByUrl("/auth");
      }
    });
  }
  onLogout = () => {
    this.authSrv.logout();
  };
  ngOnDestroy = () => {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  };
}
