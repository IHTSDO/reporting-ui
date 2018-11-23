import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        })
    });

    it('should be created', () => {
        const service: ConfigService = TestBed.get(ConfigService);
        expect(service).toBeTruthy();
    });
});
