import { TestBed } from '@angular/core/testing';

import { FillPopupDataService } from './fillPopupData.service';

describe('FillPopupDataService', () => {
  let service: FillPopupDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillPopupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
