import { TestBed } from '@angular/core/testing';

import { RepasswordRxService } from './repassword-rx.service';

describe('RepasswordRxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepasswordRxService = TestBed.get(RepasswordRxService);
    expect(service).toBeTruthy();
  });
});
