import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MagazineInterface } from 'src/app/models/magazine-interface';
import { AuthService } from 'src/app/services/auth-service.service';
import { MagazineService } from 'src/app/services/magazine-service.service';

@Component({
  selector: 'app-magazine-admin',
  templateUrl: './magazine-admin.component.html',
  styleUrls: ['./magazine-admin.component.scss'],
})
export class MagazineAdminComponent implements OnInit, OnDestroy {
  constructor(
    private magazineSvc: MagazineService,
    private authSvc: AuthService
  ) {}
  filterPost = '';
  isLogged = false;
  isAdmin = null;

  private destroy$ = new Subject<any>();
  public magazines: MagazineInterface;

  ngOnInit(): void {
    this.getListMagzine();
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

  getListMagzine(): any {
    this.magazineSvc
      .getAllMagazine()
      .subscribe((magazine: MagazineInterface) => (this.magazines = magazine));
  }

  onDeleteBook(id: string): void {
    if (confirm('¿Está seguro de eliminar esta revista?')) {
      this.magazineSvc.deleteMagazine(id).subscribe((data) => {
        location.reload();
      });
    }
  }

  resetForm(): void {
    this.magazineSvc.selectedMagazine = {
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
  }

  onPreUpdateBook(revista: MagazineInterface): void {
    this.magazineSvc.selectedMagazine = Object.assign({}, revista);
  }
}
