import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineAdminComponent } from './magazine-admin.component';

describe('MagazineAdminComponent', () => {
  let component: MagazineAdminComponent;
  let fixture: ComponentFixture<MagazineAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazineAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazineAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
