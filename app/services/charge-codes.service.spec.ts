import { TestBed } from '@angular/core/testing';

import { UserService } from './charge-codes.service';

describe('ChargeCodesService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
