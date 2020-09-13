import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BookAdminComponent } from "./components/admin/book-admin/book-admin.component";
import { MagazineAdminComponent } from "./components/admin/magazine-admin/magazine-admin.component";
import { UserAdminComponent } from "./components/admin/user-admin/user-admin.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeadersComponent } from "./components/headers/headers.component";
import { HomeComponent } from "./components/home/home.component";
import { BookModalComponent } from "./components/modals/book-modal/book-modal.component";
import { MagazineModalComponent } from "./components/modals/magazine-modal/magazine-modal.component";
import { UserModalComponent } from "./components/modals/user-modal/user-modal.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { BookUserComponent } from "./components/user/book-user/book-user.component";
import { LoginComponent } from "./components/user/login/login.component";
import { MagazineUserComponent } from "./components/user/magazine-user/magazine-user.component";
import { ProfileComponent } from "./components/user/profile/profile.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    FooterComponent,
    HeadersComponent,
    NotFoundComponent,
    UserModalComponent,
    BookModalComponent,
    MagazineModalComponent,
    BookAdminComponent,
    MagazineAdminComponent,
    UserAdminComponent,
    BookUserComponent,
    MagazineUserComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
