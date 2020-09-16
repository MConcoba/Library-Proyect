import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isAdmin = null;
  isLogged = false;
  private destroy$ = new Subject<any>();
  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.isLogged
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isLogged = res));

    this.authSvc.isAdmin$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isAdmin = res));

    this.onCheckUser();
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onCheckUser(): void {
    if (
      this.authSvc.getRole() === 'admin' &&
      this.authSvc.getCurrentUser() != null
    ) {
      this.isLogged = true;
      this.isAdmin = 'admin';
    } else if (
      (this.authSvc.getRole() === 'estudiante' ||
        this.authSvc.getRole() === 'catedratico') &&
      this.authSvc.getCurrentUser() != null
    ) {
      this.isAdmin = null;
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
