import { Component, OnInit } from '@angular/core';
import { BookInterface } from 'src/app/models/book-interface';
import { BookService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-book-user',
  templateUrl: './book-user.component.html',
  styleUrls: ['./book-user.component.scss'],
})
export class BookUserComponent implements OnInit {
  constructor(private bookSvc: BookService) {}
  public books: BookInterface;
  public booksLend: BookInterface;
  ngOnInit(): void {
    this.getListBooks();
    this.getListBooksLend();
  }
  getListBooks(): any {
    this.bookSvc.getAllBooks().subscribe((book: BookInterface) => {
      this.books = book;
    });
  }

  getListBooksLend(): any {
    this.bookSvc.getAllBooksLend().subscribe((book: BookInterface) => {
      this.booksLend = book;
    });
  }

  onLendBook(id: string): void {
    this.bookSvc.lendBook(id).subscribe((data) => {
      location.reload();
    });
  }

  onReturnBook(id: string): void {
    this.bookSvc.returnBook(id).subscribe((data) => {
      location.reload();
    });
  }
}
