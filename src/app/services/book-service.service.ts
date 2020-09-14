import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { BookInterface } from '../models/book-interface';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  books: Observable<any>;
  book: Observable<any>;
  public selectedBook: BookInterface = {
    _id: '',
    author: '',
    title: '',
    edicion: '',
    keywords: [''],
    description: '',
    topics: [''],
    copies: 0,
    available: 0,
  };

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken(),
  });

  getToken() {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const dato = user.Token;
    console.log(dato);
    return dato;
  }

  getAllBooks() {
    const urlApi = `http://localhost:3000/api/get-books`;
    return this.http.get(urlApi);
  }

  getBookById(id: string) {
    const urlApi = `http://localhost:3000/api/books/${id}`;
    return (this.book = this.http.get(urlApi));
  }

  saveBook(bookData: BookInterface) {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http
      .post<BookInterface>(`/api/new-book`, bookData, { headers })
      .pipe(map((data: BookInterface) => data));
  }

  updateBook(bookData: BookInterface) {
    const idBook = bookData._id;
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http
      .put<BookInterface>(`/api/update-book/${idBook}`, bookData, { headers })
      .pipe(map((data: BookInterface) => data));
  }

  deleteBook(idBook: string): Observable<BookInterface | void> {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http
      .delete<BookInterface>(`/api/delete-book/${idBook}`, { headers })
      .pipe(map((data) => data));
  }
}
