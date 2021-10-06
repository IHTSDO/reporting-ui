import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReportingService } from './reporting.service';

describe('ReportingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ReportingService
            ],
            imports: [
                HttpClientModule
            ]
        });
    });

    it('should be created', () => {
        const service: ReportingService = TestBed.get(ReportingService);
        expect(service).toBeTruthy();
    });
});
