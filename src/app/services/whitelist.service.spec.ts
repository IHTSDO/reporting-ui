import { TestBed } from '@angular/core/testing';

import { WhitelistService } from './whitelist.service';
import { HttpClientModule } from '@angular/common/http';

describe('WhitelistService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [],
            imports: [
                HttpClientModule
            ]
        });
    });

    it('should be created', () => {
        const service: WhitelistService = TestBed.get(WhitelistService);
        expect(service).toBeTruthy();
    });
});
