import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate() {
    if (this.authSvc.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
