import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { LoginComponent } from 'src/app/components/user/login/login.component';
import { ProfileComponent } from 'src/app/components/user/profile/profile.component';
import { BookAdminComponent } from './components/admin/book-admin/book-admin.component';
import { MagazineAdminComponent } from './components/admin/magazine-admin/magazine-admin.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
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
  }, // TODO: only users auth
  {
    path: 'admin/book',
    component: BookAdminComponent,
    canActivate: [AuthGuard, CheckLoginGuard],
  }, // TODO: only users auth
  {
    path: 'admin/magazine',
    component: MagazineAdminComponent,
    canActivate: [AuthGuard, CheckLoginGuard],
  },
  {
    path: 'user/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  // TODO: only users auth
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
