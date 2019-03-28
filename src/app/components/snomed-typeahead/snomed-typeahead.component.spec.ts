import { async, TestBed } from '@angular/core/testing';
import { SnomedTypeaheadComponent } from './snomed-typeahead.component';
import { ConceptsPipe } from '../../pipes/concepts.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ConceptService } from '../../services/concept.service';

describe('SnomedTypeaheadComponent', () => {
    let component: SnomedTypeaheadComponent;
    let conceptService: ConceptService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SnomedTypeaheadComponent,
                ConceptsPipe
            ],
            imports: [
                HttpClientModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        conceptService = new ConceptService(null);
        component = new SnomedTypeaheadComponent(conceptService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
