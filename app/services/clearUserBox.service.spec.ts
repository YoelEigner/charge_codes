import { TestBed } from '@angular/core/testing';

import { clearUserBoxService } from './clearUserBox.service';

describe('ClearUserBoxService', () => {
  let service: clearUserBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(clearUserBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
