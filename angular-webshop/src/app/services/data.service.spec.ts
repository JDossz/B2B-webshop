import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@ängular/common';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});

  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('readTableByQuery should set the appropriate field', () => {
    const service: DataService = TestBed.get(DataService);
    service.readTableByQuery('users', {
      id: 6
    });
    service.user.subscribe(data => {
      expect(data.emailaddress).toEqual('olah.daniel95@gmail.com');
    })
  });

});
