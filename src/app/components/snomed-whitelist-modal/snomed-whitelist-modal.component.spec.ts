import { async, TestBed } from '@angular/core/testing';
import { SnomedWhitelistModalComponent } from './snomed-whitelist-modal.component';
import { FormsModule } from '@angular/forms';
import { SnomedTypeaheadComponent } from '../snomed-typeahead/snomed-typeahead.component';
import { ConceptsPipe } from '../../pipes/concepts.pipe';
import { HttpClientModule } from '@angular/common/http';
import { WhitelistService } from '../../services/whitelist.service';

describe('SnomedWhitelistModalComponent', () => {
    let component: SnomedWhitelistModalComponent;
    let whitelistService: WhitelistService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnomedWhitelistModalComponent,
                SnomedTypeaheadComponent,
                ConceptsPipe
            ],
            imports: [
                FormsModule,
                HttpClientModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        whitelistService = new WhitelistService(null);
        component = new SnomedWhitelistModalComponent(whitelistService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
