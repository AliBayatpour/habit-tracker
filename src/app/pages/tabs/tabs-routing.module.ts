import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "journal",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../journal/journal.module").then(
                (m) => m.JournalPageModule
              ),
            canLoad: [AuthGuard],
          },
        ],
      },
      {
        path: "progress",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../progress/progress.module").then(
                (m) => m.ProgressPageModule
              ),
            canLoad: [AuthGuard],
          },
        ],
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../settings/settings.module").then(
                (m) => m.SettingsPageModule
              ),
            canLoad: [AuthGuard],
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/journal",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/journal",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
