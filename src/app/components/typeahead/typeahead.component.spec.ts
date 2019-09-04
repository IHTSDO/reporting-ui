import { async, TestBed } from '@angular/core/testing';
import { TypeaheadComponent } from './snomed-typeahead.component';
import { ConceptsPipe } from '../../pipes/concepts.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ConceptService } from '../../services/concept.service';

describe('SnomedTypeaheadComponent', () => {
    let component: TypeaheadComponent;
    let conceptService: ConceptService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TypeaheadComponent,
                ConceptsPipe
            ],
            imports: [
                HttpClientModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        conceptService = new ConceptService(null);
        component = new TypeaheadComponent(conceptService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
