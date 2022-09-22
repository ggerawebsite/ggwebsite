import { TestBed } from '@angular/core/testing';

import { CanCreatePartyGuard } from './can-create-party.guard';

describe('CanCreatePartyGuard', () => {
  let guard: CanCreatePartyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanCreatePartyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
