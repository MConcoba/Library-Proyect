import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineModalComponent } from './magazine-modal.component';

describe('MagazineModalComponent', () => {
  let component: MagazineModalComponent;
  let fixture: ComponentFixture<MagazineModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazineModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
