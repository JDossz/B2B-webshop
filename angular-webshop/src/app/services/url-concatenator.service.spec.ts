import { TestBed } from '@angular/core/testing';

import { UrlConcatenatorService } from './url-concatenator.service';

describe('UrlConcatenatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlConcatenatorService = TestBed.get(UrlConcatenatorService);
    expect(service).toBeTruthy();
  });
});
