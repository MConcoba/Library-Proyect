import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChartsModule } from 'ng2-charts';
// Services
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { BookAdminComponent } from './components/admin/book-admin/book-admin.component';
import { MagazineAdminComponent } from './components/admin/magazine-admin/magazine-admin.component';
import { BooksReportComponent } from './components/admin/reports/books-report/books-report.component';
import { MagazineReportComponent } from './components/admin/reports/magazine-report/magazine-report.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { HeadersComponent } from './components/headers/headers.component';
import { HomeComponent } from './components/home/home.component';
import { BookModalComponent } from './components/modals/book-modal/book-modal.component';
import { MagazineModalComponent } from './components/modals/magazine-modal/magazine-modal.component';
import { UserModalComponent } from './components/modals/user-modal/user-modal.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookUserComponent } from './components/user/book-user/book-user.component';
import { LoginComponent } from './components/user/login/login.component';
import { MagazineUserComponent } from './components/user/magazine-user/magazine-user.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { MaterialModule } from './material.module';
import { FilterPipe } from './pipes/filter.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { AuthService } from './services/auth-service.service';
import { BookService } from './services/book-service.service';
import { MagazineService } from './services/magazine-service.service';
import { FilterUserPipe } from './pipes/filter-user.pipe';

@NgModule({
  declarations: [
    AppComponent,
    // Iniciles
    HeadersComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    // Admin
    BookAdminComponent,
    MagazineAdminComponent,
    UserAdminComponent,
    // user
    BookUserComponent,
    MagazineUserComponent,
    ProfileComponent,
    // Modals
    BookModalComponent,
    MagazineModalComponent,
    UserModalComponent,
    // Pipes
    TruncateTextPipe,
    FilterPipe,
    ReportsComponent,
    BooksReportComponent,
    MagazineReportComponent,
    AboutComponent,
    FilterUserPipe,
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
    ChartsModule,
  ],
  exports: [],
  providers: [AuthService, BookService, MagazineService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
