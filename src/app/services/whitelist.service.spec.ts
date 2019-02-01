import { TestBed } from '@angular/core/testing';

import { WhitelistService } from './whitelist.service';

describe('WhitelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhitelistService = TestBed.get(WhitelistService);
    expect(service).toBeTruthy();
  });
});
