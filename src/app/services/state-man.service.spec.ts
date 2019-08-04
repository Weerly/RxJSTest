import { TestBed } from '@angular/core/testing';

import { StateManService } from './state-man.service';

describe('StateManService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateManService = TestBed.get(StateManService);
    expect(service).toBeTruthy();
  });
});
