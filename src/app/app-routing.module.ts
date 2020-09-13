import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookAdminComponent } from "./components/admin/book-admin/book-admin.component";
import { MagazineAdminComponent } from "./components/admin/magazine-admin/magazine-admin.component";
import { UserAdminComponent } from "./components/admin/user-admin/user-admin.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { BookUserComponent } from "./components/user/book-user/book-user.component";
import { LoginComponent } from "./components/user/login/login.component";
import { MagazineUserComponent } from "./components/user/magazine-user/magazine-user.component";
import { ProfileComponent } from "./components/user/profile/profile.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "user/login", component: LoginComponent },
  { path: "admin/book", component: BookAdminComponent }, // TODO: only users auth
  { path: "admin/magazine", component: MagazineAdminComponent },
  { path: "admin/user", component: UserAdminComponent },
  { path: "user/book", component: BookUserComponent }, // TODO: only users auth
  { path: "user/magazine", component: MagazineUserComponent },
  { path: "user/profile", component: ProfileComponent },
  { path: "*", component: NotFoundComponent }, // TODO: only users auth
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
