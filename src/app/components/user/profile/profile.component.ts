import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserResponse } from 'src/app/models/user-interface';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private authSvc: AuthService) {}
  filterPost = '';
  isLogged = false;
  isAdmin = null;

  private destroy$ = new Subject<any>();
  public users: UserResponse;

  ngOnInit(): void {
    this.getListUsers();
    this.authSvc.isLogged
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isLogged = res));

    this.authSvc.isAdmin$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isAdmin = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  getListUsers(): any {
    this.authSvc
      .getUserProfile()
      .subscribe((user: UserResponse) => (this.users = user));
  }
}
