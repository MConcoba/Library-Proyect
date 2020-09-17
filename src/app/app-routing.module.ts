import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { LoginComponent } from 'src/app/components/user/login/login.component';
import { ProfileComponent } from 'src/app/components/user/profile/profile.component';
import { BookAdminComponent } from './components/admin/book-admin/book-admin.component';
import { MagazineAdminComponent } from './components/admin/magazine-admin/magazine-admin.component';
import { BooksReportComponent } from './components/admin/reports/books-report/books-report.component';
import { MagazineReportComponent } from './components/admin/reports/magazine-report/magazine-report.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookUserComponent } from './components/user/book-user/book-user.component';
import { MagazineUserComponent } from './components/user/magazine-user/magazine-user.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckLoginGuard } from './guards/check-admin.guard';
import { NotLogin } from './guards/not-login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/login', component: LoginComponent, canActivate: [NotLogin] },
  {
    path: 'admin/user',
    component: UserAdminComponent,
    canActivate: [AuthGuard, CheckLoginGuard],
  },
  {
    path: 'admin/book',
    component: BookAdminComponent,
    canActivate: [AuthGuard, CheckLoginGuard],
  },
  {
    path: 'admin/magazine',
    component: MagazineAdminComponent,
    canActivate: [AuthGuard, CheckLoginGuard],
  },
  {
    path: 'admin/reports-book',
    component: BooksReportComponent,
    canActivate: [AuthGuard, CheckLoginGuard],
  },
  {
    path: 'admin/reports-magazine',
    component: MagazineReportComponent,
    canActivate: [AuthGuard, CheckLoginGuard],
  },
  {
    path: 'user/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/book',
    component: BookUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/magazine',
    component: MagazineUserComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
