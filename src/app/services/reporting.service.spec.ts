import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ReportingService } from './reporting.service';

describe('ReportingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReportingService],
            imports: [HttpClientModule]
        });
    });

    it('should be created', inject([ReportingService], (service: ReportingService) => {
        expect(service).toBeTruthy();
    }));
});
