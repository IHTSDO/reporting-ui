import { TestBed } from '@angular/core/testing';

import { TerminologyServerService } from './terminologyServer.service';

describe('SnowowlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TerminologyServerService = TestBed.get(TerminologyServerService);
    expect(service).toBeTruthy();
  });
});
