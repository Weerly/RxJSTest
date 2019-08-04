import { TestBed } from '@angular/core/testing';

import { PasswordRxService } from './password-rx.service';

describe('PasswordRxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordRxService = TestBed.get(PasswordRxService);
    expect(service).toBeTruthy();
  });
});
