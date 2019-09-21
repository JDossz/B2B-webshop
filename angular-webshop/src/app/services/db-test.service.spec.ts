import { TestBed } from '@angular/core/testing';

import { DbTestService } from './db-test.service';

describe('DbTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbTestService = TestBed.get(DbTestService);
    expect(service).toBeTruthy();
  });
});
