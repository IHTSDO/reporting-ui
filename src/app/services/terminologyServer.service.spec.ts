import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TerminologyServerService } from './terminologyServer.service';

describe('TerminologyServerService', () => {
  beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
                HttpClientModule
            ],
            schemas: []
        }).compileComponents();
    }));

  it('should be created', () => {
    const service: TerminologyServerService = TestBed.get(TerminologyServerService);
    expect(service).toBeTruthy();
  });
});
