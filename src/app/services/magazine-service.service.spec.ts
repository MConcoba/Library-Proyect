import { TestBed } from '@angular/core/testing';

import { MagazineServiceService } from './magazine-service.service';

describe('MagazineServiceService', () => {
  let service: MagazineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagazineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
