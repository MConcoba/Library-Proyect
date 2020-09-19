import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit, OnDestroy {
  isLogged = false;
  isAdmin = null;

  opcionSeleccionado: string = '0';
  verSeleccion: string = '';

  private destroy$ = new Subject<any>();
  constructor(public authSvc: AuthService) {}
  ngOnInit() {
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

  onSaveUser(formUser: NgForm) {
    if (formUser.value._id === '' || formUser.value._id == null) {
      // NEW
      this.authSvc.createUser(formUser.value).subscribe((data) => {
        location.reload();
      });
    } else {
      // update
      this.authSvc.updateUser(formUser.value).subscribe((data) => {
        location.reload();
      });
    }
  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
  }

  onDeleteUser(id: string): void {
    this.authSvc.deleteUser(id).subscribe((data) => {
      location.reload();
    });
  }
}
