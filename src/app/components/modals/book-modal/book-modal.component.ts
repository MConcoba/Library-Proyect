import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service.service';
import { BookService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
})
export class BookModalComponent implements OnInit, OnDestroy {
  isLogged = false;
  isAdmin = null;

  bookForm = this.fb.group({
    author: ['', [Validators.required]],
    title: ['', [Validators.required]],
  });

  private destroy$ = new Subject<any>();
  constructor(
    private fb: FormBuilder,
    public bookSvc: BookService,
    public location: Location,
    public authSvc: AuthService
  ) {}
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

  onSaveBook(bookForm: NgForm) {
    if (bookForm.value._id == null) {
      // NEW
      this.bookSvc.saveBook(bookForm.value).subscribe((data) => {
        location.reload();
      });
    } else {
      // update
      this.bookSvc.updateBook(bookForm.value).subscribe((data) => {
        location.reload();
      });
    }
  }

  onDeleteBook(id: string): void {
    this.bookSvc.deleteBook(id).subscribe((data) => {
      location.reload();
    });
  }
}
