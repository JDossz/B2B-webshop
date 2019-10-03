import { TestBed } from '@angular/core/testing';

import { UrlConcatenatorService } from './url-concatenator.service';

describe('UrlConcatenatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlConcatenatorService = TestBed.get(UrlConcatenatorService);
    expect(service).toBeTruthy();
  });

  it('getQueryString should concatenate an utl query string based on the parameter object.', () => {
    const service: UrlConcatenatorService = TestBed.get(UrlConcatenatorService);
    const result = service.getQueryString({
      id: 6,
      name: 'Test',
      spaced: 'Test with spaces',
    });
    expect(result).toEqual('?id=6&name=Test&spaced=Test%20with%20spaces');
  });

});
