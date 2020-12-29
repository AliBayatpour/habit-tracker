import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./pages/auth/auth.guard";

const routes: Routes = [
  {
    path: "tabs",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then((m) => m.TabsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "tabs",
    pathMatch: "full",
  },
  {
    path: "new-habit",
    loadChildren: () =>
      import("./pages/new-habit/new-habit.module").then(
        (m) => m.NewHabitPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: "add-habit",
    loadChildren: () =>
      import("./pages/add-habit/add-habit.module").then(
        (m) => m.AddHabitPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
