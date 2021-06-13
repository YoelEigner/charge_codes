import { TestBed } from '@angular/core/testing';

import { ProgramCodeService } from './program-code.service';

describe('ProgramCodeService', () => {
  let service: ProgramCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
