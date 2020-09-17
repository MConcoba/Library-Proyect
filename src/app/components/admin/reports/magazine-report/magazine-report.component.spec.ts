import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineReportComponent } from './magazine-report.component';

describe('MagazineReportComponent', () => {
  let component: MagazineReportComponent;
  let fixture: ComponentFixture<MagazineReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazineReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazineReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
