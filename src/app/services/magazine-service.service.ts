import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MagazineInterface } from '../models/magazine-interface';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  magazines: Observable<any>;
  magazine: Observable<any>;
  public selectedMagazine: MagazineInterface = {
    _id: '',
    author: '',
    title: '',
    edicion: '',
    description: '',
    frequencyActs: '',
    specimens: 0,
    topics: [''],
    keywords: [''],
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

    return dato;
  }

  getAllMagazine() {
    const urlApi = `http://localhost:3000/api/get-magazines`;
    return this.http.get(urlApi);
  }

  getMagazineId(id: string) {
    const urlApi = `http://localhost:3000/api/get-magazines/${id}`;
    return (this.magazine = this.http.get(urlApi));
  }

  getAllMagazineLend() {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http.get(`/api/get-magazine-lend`, { headers });
  }

  getMagazineCountLend() {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http.get(`/api/get-count-magazines-lend`, { headers });
  }

  saveMagazine(magazineData: MagazineInterface) {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http
      .post<MagazineInterface>(`/api/new-magazine`, magazineData, { headers })
      .pipe(map((data: MagazineInterface) => data));
  }

  updateMagazine(magazineData: MagazineInterface) {
    const idMagazine = magazineData._id;
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http
      .put<MagazineInterface>(
        `/api/update-magazine/${idMagazine}`,
        magazineData,
        {
          headers,
        }
      )
      .pipe(map((data: MagazineInterface) => data));
  }

  deleteMagazine(idMagazine: string): Observable<MagazineInterface | void> {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http
      .delete<MagazineInterface>(`/api/delete-magazine/${idMagazine}`, {
        headers,
      })
      .pipe(map((data) => data));
  }

  lendMagazine(idMagazine: string): Observable<MagazineInterface | void> {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http
      .get<MagazineInterface>(`/api/lend-magazine/${idMagazine}`, { headers })
      .pipe(map((data) => data));
  }

  returnMagazine(idMagazine: string): Observable<MagazineInterface | void> {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'testheader');
    headers = headers.append('Authorization', this.getToken());
    return this.http
      .get<MagazineInterface>(`/api/return-magazine/${idMagazine}`, { headers })
      .pipe(map((data) => data));
  }
}
