import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineUserComponent } from './magazine-user.component';

describe('MagazineUserComponent', () => {
  let component: MagazineUserComponent;
  let fixture: ComponentFixture<MagazineUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazineUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazineUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
