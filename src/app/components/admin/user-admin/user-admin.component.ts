import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserInterface, UserRegister } from 'src/app/models/user-interface';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
})
export class UserAdminComponent implements OnInit, OnDestroy {
  constructor(private authSvc: AuthService) {}

  filterPost = '';
  isLogged = false;
  isAdmin = null;

  private destroy$ = new Subject<any>();
  public users: UserRegister;

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
      .getAllUsers()
      .subscribe((user: UserRegister) => (this.users = user));
  }

  onDeleteUser(id: string): void {
    if (confirm('Está seguro de eliminar este Usuario?')) {
      this.authSvc.deleteUser(id).subscribe((data) => {
        location.reload();
      });
    }
  }

  resetForm(): void {
    this.authSvc.userSelected = {
      _id: null,
      role: '',
      carnet: '',
      dpi: '',
      name: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      amount_book_borrowed: 0,
      amount_magazine_borrowed: 0,
      books_borrowed: ['string'],
      magazines_borrowed: ['string'],
    };
  }

  onPreUpdateUser(libr: UserInterface): void {
    this.authSvc.userSelected = Object.assign({}, libr);
  }
}
