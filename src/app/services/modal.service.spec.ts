import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ModalService } from './modal.service';

describe('ModalService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ModalService],
            imports: [HttpClientModule]
        });
    });

    it('should be created', inject([ModalService], (service: ModalService) => {
        expect(service).toBeTruthy();
    }));
});
