import { TestBed } from '@angular/core/testing';

import { PopupFeildsService } from './popup-feilds.service';

describe('PopupFeildsService', () => {
  let service: PopupFeildsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupFeildsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
