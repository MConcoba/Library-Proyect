import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss'],
})
export class HeadersComponent implements OnInit, OnDestroy {
  isAdmin = null;
  isLogged = false;

  private destroy$ = new Subject<any>();

  @Output() toggelSidenav = new EventEmitter<void>();

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

  onToggelSidenav(): void {
    this.toggelSidenav.emit();
  }
  onLogout(): void {
    this.authSvc.logout();
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
      this.isAdmin = '';
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
