import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BookInterface } from 'src/app/models/book-interface';
import { AuthService } from 'src/app/services/auth-service.service';
import { BookService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-book-admin',
  templateUrl: './book-admin.component.html',
  styleUrls: ['./book-admin.component.scss'],
})
export class BookAdminComponent implements OnInit, OnDestroy {
  constructor(private bookSvc: BookService, private authSvc: AuthService) {}
  filterPost = '';
  isLogged = false;
  isAdmin = null;
  elements: any = [];
  searchText = '';
  previous: string;

  private destroy$ = new Subject<any>();
  public books: BookInterface;
  getListBooks(): any {
    this.bookSvc.getAllBooks().subscribe((book: BookInterface) => {
      (this.books = book), (this.elements = book);
    });
  }

  ngOnInit(): void {
    this.getListBooks();
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

  getData() {}

  onDeleteBook(id: string): void {
    if (confirm('Está seguro de eliminar este libro?')) {
      this.bookSvc.deleteBook(id).subscribe((data) => {
        location.reload();
      });
    }
  }

  resetForm(): void {
    this.bookSvc.selectedBook = {
      _id: null,
      author: '',
      title: '',
      edicion: '',
      keywords: [''],
      description: '',
      topics: [''],
      copies: 0,
      available: 0,
    };
  }

  onPreUpdateBook(libr: BookInterface): void {
    this.bookSvc.selectedBook = Object.assign({}, libr);
  }
}
