import { TestBed } from '@angular/core/testing';

import { FillDataTablesService } from './fillDataTables.service';

describe('FillDataTablesService', () => {
  let service: FillDataTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillDataTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
