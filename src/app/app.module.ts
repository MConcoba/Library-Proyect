import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// Services
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAdminComponent } from './components/admin/book-admin/book-admin.component';
import { MagazineAdminComponent } from './components/admin/magazine-admin/magazine-admin.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { HeadersComponent } from './components/headers/headers.component';
import { HomeComponent } from './components/home/home.component';
import { BookModalComponent } from './components/modals/book-modal/book-modal.component';
import { BookUserComponent } from './components/user/book-user/book-user.component';
import { LoginComponent } from './components/user/login/login.component';
import { MagazineUserComponent } from './components/user/magazine-user/magazine-user.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { MaterialModule } from './material.module';
import { FilterPipe } from './pipes/filter.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { AuthService } from './services/auth-service.service';
import { BookService } from './services/book-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    BookAdminComponent,
    MagazineAdminComponent,
    UserAdminComponent,
    BookUserComponent,
    MagazineUserComponent,
    HeadersComponent,
    TruncateTextPipe,
    FilterPipe,
    BookModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [],
  providers: [AuthService, BookService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
