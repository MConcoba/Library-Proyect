import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { BookInterface } from 'src/app/models/book-interface';
import { MagazineInterface } from 'src/app/models/magazine-interface';
import { BookService } from 'src/app/services/book-service.service';
import { MagazineService } from 'src/app/services/magazine-service.service';

@Component({
  selector: 'app-magazine-report',
  templateUrl: './magazine-report.component.html',
  styleUrls: ['./magazine-report.component.scss'],
})
export class MagazineReportComponent implements OnInit {
  // Pie
  book = [];
  magazine = [];
  colors = [];
  constructor(
    private bookSvc: BookService,
    private magazineSvc: MagazineService
  ) {}
  public books: BookInterface;
  public magazines: MagazineInterface;

  ngOnInit() {
    this.getListMagzine();
    this.getGrafica();
  }

  getGrafica() {
    this.magazineSvc.getMagazineCountLend().subscribe((magazine) => {
      const dataT = magazine['list'].map((res) => res.countLend);
      const la = magazine['list'].map((res) => res.author);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < dataT.length; i++) {
        this.colors.push(
          '#' + Math.floor(Math.random() * 16777215).toString(16)
        );
      }

      const magazinsese = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: la,
          datasets: [
            {
              label: 'Libros',
              data: dataT,
              backgroundColor: this.colors,
              fill: false,
            },
          ],
        },
      });
    });
  }

  getListMagzine(): any {
    this.magazineSvc
      .getAllMagazine()
      .subscribe((magazine: MagazineInterface) => (this.magazines = magazine));
  }

  export_graph = <HTMLCanvasElement>document.getElementById('doc');
  downloadLink: string;

  exportGraph() {
    this.downloadLink = this.export_graph.toDataURL('');
  }

  downloadCanvas(event) {
    // get the `<a>` element from click event
    const anchor = event.target;
    // get the canvas, I'm getting it by tag name, you can do by id
    // and set the href of the anchor to the canvas dataUrl
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    // set the anchors 'download' attibute (name of the file to be downloaded)
    anchor.url = './';
    anchor.download = 'Preporte-Revista.png';
  }
}
