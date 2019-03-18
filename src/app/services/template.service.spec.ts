import { TestBed } from '@angular/core/testing';

import { TemplateService } from './template.service';
import { HttpClientModule } from '@angular/common/http';

describe('TemplateService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TemplateService
            ],
            imports: [
                HttpClientModule
            ]
        });
    });

    it('should be created', () => {
        const service: TemplateService = TestBed.get(TemplateService);
        expect(service).toBeTruthy();
    });
});
