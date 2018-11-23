import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { HttpService } from './http.service';

describe('HttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpService],
            imports: [HttpClientModule]
        });
    });

    it('should be created', inject([HttpService], (service: HttpService) => {
        expect(service).toBeTruthy();
    }));
});
