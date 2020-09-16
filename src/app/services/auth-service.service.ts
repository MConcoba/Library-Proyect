import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import {
  Roles,
  User,
  UserInterface,
  UserResponse,
} from '../models/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  public role = new BehaviorSubject<Roles>(null);

  constructor(private http: HttpClient, private router: Router) {}
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  users: Observable<any>;
  user: Observable<any>;
  public userSelected: UserInterface = {
    _id: '',
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

  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  getTokenAuth() {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const dato = user.Token;

    return dato;
  }

  getRole() {
    const userString = localStorage.getItem('user');
    if (userString != null) {
      const user = JSON.parse(localStorage.getItem('user')) || null;
      const dato = user.role;
      return dato;
    } else {
      return null;
    }
  }

  getCurrentUser(): UserInterface {
    const userString = localStorage.getItem('user');
    if (userString != null) {
      const user: UserInterface = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }

  logoutUser() {
    let accessToken = localStorage.getItem('accessToken');
    const url_api = `http://localhost:3000/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return this.http.post<UserInterface>(url_api, { headers: this.headers });
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<string> {
    return this.role.asObservable();
  }

  // ------------------------------------------------------------------------------------------------------------------

  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`http://localhost:3000/api/login`, authData)
      .pipe(
        map((res: UserResponse) => {
          this.saveLocalStorage(res);
          this.loggedIn.next(true);
          this.role.next(res.role);
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  private saveLocalStorage(user: UserResponse): void {
    const { _id, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/user/login']);
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'An error occured retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // ------------------------ USER -----------------------------------

  getAllUsers() {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getTokenAuth());
    return this.http.get(`/api/get-users`, { headers });
  }

  userProfile() {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http.get(`/api/user-profile`, { headers });
  }

  getUserProfile() {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getTokenAuth());
    return this.http.get(`/api/user-profile`, { headers });
  }

  getUserById(id: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    const urlApi = `/api/get-user/${id}`;
    return (this.user = this.http.get(urlApi));
  }

  createUser(userData: UserInterface) {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getTokenAuth());
    return this.http
      .post<UserInterface>(`/api/create-user`, userData, { headers })
      .pipe(map((data: UserInterface) => data));
  }

  updateUser(userData: UserInterface) {
    const idUser = userData._id;
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http
      .put<UserInterface>(`/api/update-user/${idUser}`, userData, { headers })
      .pipe(map((data: UserInterface) => data));
  }

  deleteUser(idUser: string): Observable<UserInterface | void> {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http
      .delete<UserInterface>(`/api/delete-user/${idUser}`, { headers })
      .pipe(map((data) => data));
  }
}
