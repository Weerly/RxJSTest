import { TestBed } from '@angular/core/testing';

import { EmailRxService } from './email-rx.service';

describe('EmailRxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailRxService = TestBed.get(EmailRxService);
    expect(service).toBeTruthy();
  });
});
