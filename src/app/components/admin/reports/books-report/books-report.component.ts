import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { jsPDF } from 'jspdf';
import { BookInterface } from 'src/app/models/book-interface';
import { MagazineInterface } from 'src/app/models/magazine-interface';
import { BookService } from 'src/app/services/book-service.service';
import { MagazineService } from 'src/app/services/magazine-service.service';

@Component({
  selector: 'app-books-report',
  templateUrl: './books-report.component.html',
  styleUrls: ['./books-report.component.scss'],
})
export class BooksReportComponent implements OnInit {
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
    this.getListBooks();
    this.getListMagzine();
    this.getGrafica();
  }

  getGrafica() {
    this.bookSvc.getBookCountLend().subscribe((book) => {
      const dataT = book['list'].map((res) => res.countLend);
      const la = book['list'].map((res) => res.author);

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < dataT.length; i++) {
        this.colors.push(
          '#' + Math.floor(Math.random() * 16777215).toString(16)
        );
      }

      const bookssd = new Chart('canvas', {
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

  getListBooks(): any {
    this.bookSvc.getAllBooks().subscribe((book: BookInterface) => {
      this.books = book;
    });
  }

  getListMagzine(): any {
    this.magazineSvc
      .getAllMagazine()
      .subscribe((magazine: MagazineInterface) => (this.magazines = magazine));
  }

  generatePdf() {
    const pdf = new jsPDF();
    /*
    pdf.addHTML(document.getElementById('doc')); */
    pdf.fromHTML(document.getElementById('doc'), 10, 10);
    pdf.save('Reporte-Libro');
  }

  // tslint:disable-next-line: member-ordering
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

    anchor.download = 'Reporte-Libro.pdf';
  }
}
