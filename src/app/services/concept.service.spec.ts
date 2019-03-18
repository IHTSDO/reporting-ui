import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ConceptService } from './concept.service';

describe('ConceptService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ConceptService
            ],
            imports: [
                HttpClientModule
            ]
        });
    });

    it('should be created', () => {
        const service: ConceptService = TestBed.get(ConceptService);
        expect(service).toBeTruthy();
    });
});
