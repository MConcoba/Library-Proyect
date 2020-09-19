import { Component, OnInit } from '@angular/core';
import { MagazineInterface } from 'src/app/models/magazine-interface';
import { MagazineService } from 'src/app/services/magazine-service.service';

@Component({
  selector: 'app-magazine-user',
  templateUrl: './magazine-user.component.html',
  styleUrls: ['./magazine-user.component.scss'],
})
export class MagazineUserComponent implements OnInit {
  constructor(private magazineSvc: MagazineService) {}
  filterPost = '';
  public magazines: MagazineInterface;
  public magazinesLend: MagazineInterface;
  ngOnInit(): void {
    this.getListMagazines();
    this.getListMagazinesLend();
  }
  getListMagazines(): any {
    this.magazineSvc
      .getAllMagazine()
      .subscribe((magazine: MagazineInterface) => {
        this.magazines = magazine;
      });
  }

  getListMagazinesLend(): any {
    this.magazineSvc
      .getAllMagazineLend()
      .subscribe((magazine: MagazineInterface) => {
        const dataT = magazine['list'].map((res) => res.magazine);
        console.log(magazine);
        this.magazinesLend = dataT;
      });
  }

  onLendMagazine(id: string): void {
    this.magazineSvc.lendMagazine(id).subscribe((data) => {
      location.reload();
    });
  }

  onReturnMagazine(id: string): void {
    this.magazineSvc.returnMagazine(id).subscribe((data) => {
      location.reload();
    });
  }
}
