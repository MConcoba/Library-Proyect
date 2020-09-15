import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service.service';
import { MagazineService } from 'src/app/services/magazine-service.service';

@Component({
  selector: 'app-magazine-modal',
  templateUrl: './magazine-modal.component.html',
  styleUrls: ['./magazine-modal.component.scss'],
})
export class MagazineModalComponent implements OnInit, OnDestroy {
  isLogged = false;
  isAdmin = null;

  private destroy$ = new Subject<any>();
  constructor(
    public magazineSvc: MagazineService,
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

  onSaveMagazine(magazineForm: NgForm) {
    if (magazineForm.value._id === '' || magazineForm.value._id == null) {
      // NEW
      this.magazineSvc.saveMagazine(magazineForm.value).subscribe((data) => {
        location.reload();
      });
    } else {
      // update
      this.magazineSvc.updateMagazine(magazineForm.value).subscribe((data) => {
        location.reload();
      });
    }
  }
}
