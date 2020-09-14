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

  registerUser(userDataRegister: User): Observable<any> {
    const urlApi = 'http://localhost:3000/api/Users';
    return this.http
      .post<UserInterface>(urlApi, userDataRegister, { headers: this.headers })
      .pipe(map((data) => data));
  }

  loginuser(authData: User): Observable<any> {
    const urlApi = 'http://localhost:3000/api/login';
    return this.http
      .post<UserInterface>(urlApi, authData)
      .pipe(map((data) => data));
  }

  setUser(user: UserInterface): void {
    const userstring = JSON.stringify(user);
    localStorage.setItem('currentUser', userstring);
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(): UserInterface {
    const userstring = localStorage.getItem('user');
    console.log(userstring);
    if (userstring != null) {
      const user: UserInterface = JSON.parse(userstring);
      return user;
    } else {
      return null;
    }
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
    const { id, message, ...rest } = user;
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
}
